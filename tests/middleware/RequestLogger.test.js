const express = require("express");
const request = require("supertest");
const requestLogger = require("../../middleware/RequestLogger");
const logger = require("../../utils/Logger");

// Mock the logger
jest.mock("../../utils/logger", () => ({
  info: jest.fn(),
}));

describe("Request Logger Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(requestLogger); // Use the request logger middleware

    // Define a test route
    app.get("/test-route", (req, res) => {
      res.status(200).send("test response");
    });
  });

  it("should log the request", async () => {
    await request(app).get("/test-route");

    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("Received request: GET /test-route"));
  });
});
