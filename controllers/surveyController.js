const { User, Question, Option, Response, Certificate } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const xml = require("xml");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: Option, as: "options" }],
      order: [["id", "ASC"]],
    });

    console.log(
      "Fetched Questions and Options:",
      JSON.stringify(questions, null, 2)
    );

    const acceptHeader = req.headers.accept || "";
    const wantsXML =
      acceptHeader.includes("application/xml") || req.query.format === "xml";

    if (wantsXML) {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<questions>';

      for (const q of questions) {
        xml += `<question name="${q.name}" type="${q.type}" required="${
          q.required ? "yes" : "no"
        }">`;
        xml += `<text>${q.text}</text>`;
        xml += `<description>${q.description || ""}</description>`;

        if (q.type === "choice" && q.options && q.options.length > 0) {
          // Check the 'multiple' field from the 'Option' model instead of 'q.multiple'
          const multiple = q.options[0].multiple ? "yes" : "no"; // Assumes all options for the question share the same 'multiple' value
          xml += `<options multiple="${multiple}">`;

          for (const opt of q.options) {
            xml += `<option value="${opt.value}">${opt.value}</option>`;
          }

          xml += `</options>`;
        }

        if (q.type === "file") {
          xml += `<file_properties format=".pdf" max_file_size="1" max_file_size_unit="mb" multiple="yes"/>`;
        }

        xml += `</question>`;
      }

      xml += "</questions>";

      res.set("Content-Type", "application/xml");
      return res.send(xml);
    }

    // Default to JSON
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const submitResponse = async (req, res) => {
  try {
    const { full_name, email_address, gender, description, programming_stack } =
      req.body;

    // Check if the user already exists by email
    let user = await User.findOne({ where: { email_address } });

    if (user) {
      user = await user.update({
        full_name,
        email_address,
        gender,
        description,
      });
    } else {
      user = await User.create({
        full_name,
        email_address,
        gender,
        description,
      });
    }

    const response = await Response.create({
      UserId: user.id,
      response_text: programming_stack,
    });

    const certificateXml = [];

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          await Certificate.create({
            file_name: file.filename, // stored as timestamped
            file_format: path.extname(file.originalname),
            max_file_size_mb: file.size / (1024 * 1024),
            multiple: true,
            ResponseId: response.id,
          });

          // For XML output: show original name
          certificateXml.push({ certificate: file.originalname });
        })
      );
    }

    const responseData = {
      question_response: [
        { full_name },
        { email_address },
        { description },
        { gender },
        { programming_stack },
        { certificates: certificateXml },
        {
          date_responded: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        },
      ],
    };

    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes("application/xml")) {
      const xmlResponse = xml(responseData, { declaration: true });
      res.set("Content-Type", "application/xml");
      res.status(201).send(xmlResponse);
    } else {
      res.set("Content-Type", "application/json");
      res.status(201).json(responseData);
    }
  } catch (error) {
    console.error("Error in submitResponse:", error);
    res.status(500).json({ error: error.message });
  }
};

const getResponses = async (req, res) => {
  try {
    const { page = 1, page_size = 10 } = req.query;

    const { count, rows } = await User.findAndCountAll({
      include: [{ model: Response, include: [Certificate] }],
      limit: +page_size,
      offset: (+page - 1) * +page_size,
    });

    const responseXml = rows.map((user) => {
      const resp = user.Responses[0];
      return {
        question_response: [
          { response_id: resp.id },
          { full_name: user.full_name },
          { email_address: user.email_address },
          { description: user.description },
          { gender: user.gender },
          { programming_stack: resp.response_text },
          {
            certificates: resp.Certificates.map((c) => ({
              certificate: [{ _attr: { id: c.id } }, c.file_name],
            })),
          },
          {
            date_responded: resp.date_responded
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          },
        ],
      };
    });

    const responseData = {
      question_responses: [
        {
          _attr: {
            current_page: page,
            last_page: Math.ceil(count / page_size),
            page_size,
            total_count: count,
          },
        },
        ...responseXml,
      ],
    };

    // Check the Accept header to determine the response format (XML or JSON)
    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes("application/xml")) {
      // Convert to XML
      const xmlOutput = xml(responseData);
      res.set("Content-Type", "application/xml");
      res.status(200).send(xmlOutput);
    } else {
      // Default to JSON
      res.set("Content-Type", "application/json");
      res.status(200).json(responseData);
    }
  } catch (error) {
    console.error("Error in getResponses:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id);
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      certificate.file_name
    );
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuestions,
  submitResponse,
  getResponses,
  getCertificate,
};
