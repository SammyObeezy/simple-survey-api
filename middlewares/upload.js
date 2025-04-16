const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) === ".pdf") cb(null, true);
    else cb(new Error("Only .pdf files are allowed"));
  },
  limits: { fileSize: 1 * 1024 * 1024 },
});

module.exports = upload;
