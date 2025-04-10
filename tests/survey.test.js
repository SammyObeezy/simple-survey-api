const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../models");
const path = require("path");

beforeAll(async () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  if (!sequelize.connectionManager.pool) {
    // Re-initialize the pool if it was closed in a previous test run
    await sequelize.authenticate();
  }
  await sequelize.sync({ alter: true });
});

afterAll(async () => {
  console.log.mockRestore();
  await sequelize.close(); // Close after all tests
});

describe("Survey API Endpoints", () => {
  // Test: Fetching all questions
  it("should fetch all questions", async () => {
    const res = await request(app).get("/api/questions"); // Correct route for questions
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: Submitting a survey response
  it("should submit a survey response", async () => {
    const res = await request(app)
      .put("/api/questions/responses") // Correct route for submitting responses
      .field("full_name", "Test User")
      .field("email_address", "testuser@example.com")
      .field("gender", "MALE")
      .field("description", "Testing the API")
      .field("programming_stack", "NODE,REACT")
      .attach(
        "certificates",
        path.resolve(__dirname, "fixtures", "sample.pdf")
      ); // Adjust the path to a real test file

    expect(res.statusCode).toBe(201); // Expecting a successful creation response
    expect(res.body).toHaveProperty("question_response");
  });

  // Test: Downloading a certificate by ID
  it("should attempt to download a certificate by ID", async () => {
    const res = await request(app).get(
      "/api/questions/responses/certificates/1" // Ensure certificate ID 1 exists in your database
    );
    expect(res.statusCode).toBe(200); // Should return status 200 if the file is found
  });
});
