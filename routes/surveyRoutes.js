const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.js");
const controller = require("../controllers/surveyController");

router.get("/", controller.getQuestions);
router.put(
  "/responses",
  upload.array("certificates"),
  controller.submitResponse
);
router.get("/responses", controller.getResponses);
router.get("/responses/certificates/:id", controller.getCertificate);

module.exports = router;
