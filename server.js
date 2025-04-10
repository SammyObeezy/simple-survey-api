const express = require("express");
require("dotenv").config();
const { sequelize } = require("./models/index");
const surveyRoutes = require("./routes/surveyRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Survey API");
});

const PORT = process.env.PORT || 5000;
// Use survey routes for /api/questions
app.use("/api/questions", surveyRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;
