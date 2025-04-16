const express = require("express");
const router = express.Router();
const { upload, attachCloudinaryUrl } = require("../middlewares/upload.js");
const controller = require("../controllers/surveyController");

router.get("/", controller.getQuestions);
router.put(
  "/responses",
  upload.array("certificates"),
  attachCloudinaryUrl,
  controller.submitResponse
);
router.get("/responses", controller.getResponses);
router.get("/responses/certificates/:id", controller.getCertificate);

module.exports = router;
