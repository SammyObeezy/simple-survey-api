const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "survey_certificates", // The folder in Cloudinary where the files will be stored
    allowed_formats: ["pdf"], // Allowed file types (only PDFs here)
    public_id: (req, file) => {
      // This will generate a unique name for the file using the current timestamp and original name
      return Date.now() + "-" + file.originalname;
    },
  },
});

// Set up multer to use the Cloudinary storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // Limit file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (path.extname(file.originalname) === ".pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf files are allowed"), false);
    }
  },
});

module.exports = upload;
