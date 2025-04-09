const { sequelize, Question, Option } = require("./models");

const seedQuestions = async () => {
  try {
    // Clear existing data
    await Option.destroy({ where: {} });
    await Question.destroy({ where: {} });

    const questions = [
      {
        name: "full_name",
        type: "short_text",
        required: true,
        text: "What is your full name?",
        description: "[Surname] [First Name] [Other Names]",
      },
      {
        name: "email_address",
        type: "email",
        required: true,
        text: "What is your email address?",
        description: "",
      },
      {
        name: "description",
        type: "long_text",
        required: true,
        text: "Tell us a bit more about yourself",
        description: "",
      },
      {
        name: "gender",
        type: "choice",
        required: true,
        text: "What is your gender?",
        description: "",
        options: ["MALE", "FEMALE", "OTHER"],
      },
      {
        name: "programming_stack",
        type: "choice",
        required: true,
        text: "What programming stack are you familiar with?",
        description: "You can select multiple",
        options: [
          "REACT",
          "ANGULAR",
          "VUE",
          "SQL",
          "POSTGRES",
          "MYSQL",
          "MSSQL",
          "Java",
          "PHP",
          "GO",
          "RUST",
        ],
      },
      {
        name: "certificates",
        type: "file",
        required: true,
        text: "Upload any of your certificates?",
        description: "You can upload multiple (.pdf)",
      },
    ];

    for (const q of questions) {
      const question = await Question.create({
        name: q.name,
        type: q.type,
        required: q.required,
        text: q.text,
        description: q.description,
      });

      console.log(`Created question: ${q.name}`);

      if (q.options) {
        await Promise.all(
          q.options.map((opt) =>
            Option.create({
              value: opt,
              multiple: q.name === "programming_stack",
              question_id: question.id,
            })
          )
        );
        console.log(`Created options for question: ${q.name}`);
      }
    }

    console.log("✅ Questions seeded");
  } catch (error) {
    console.error("Error seeding questions:", error);
  } finally {
    await sequelize.close(); // Close the database connection
    process.exit();
  }
};

seedQuestions();
