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

// Use survey routes for /api/questions
app.use("/api/questions", surveyRoutes);

// Sync the database before tests start
beforeAll(async () => {
  await sequelize.sync({ alter: true }); // Wait for the database sync to complete
  console.log("Database synced");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Cleanup after all tests
afterAll(() => {
  sequelize.close(); // Close the database connection after tests
  server.close(); // Close the server
});

module.exports = app;
