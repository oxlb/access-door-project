const request = require("supertest");
const express = require("express");
const setupMiddleware = require("../middleware/SetupMiddleware");

const app = express();
setupMiddleware(app);

describe("Test Express App", () => {
  it("should respond to a GET request", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
  });
});
