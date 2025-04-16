const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const USE_CLOUDINARY = process.env.USE_CLOUDINARY === "true";

if (USE_CLOUDINARY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

let storage;

if (USE_CLOUDINARY) {
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "survey_uploads",
      allowed_formats: ["pdf"],
      resource_type: "raw",
      transformation: [{ width: 1000, crop: "limit" }],
      format: "pdf",
    },
  });
} else {
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
}

const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname) === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

const attachCloudinaryUrl = (req, res, next) => {
  if (USE_CLOUDINARY && req.files) {
    req.files.forEach((file) => {
      if (file.path && file.filename) {
        file.cloudinary_url = file.path;
      }
    });
  }
  next();
};

module.exports = { upload, attachCloudinaryUrl };
