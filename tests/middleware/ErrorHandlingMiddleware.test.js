const express = require("express");
const request = require("supertest");
const errorHandlingMiddleware = require("../../middleware/ErrorHandlingMiddleware");
const CustomError = require("../../models/errors/CustomError");
const logger = require("../../utils/Logger");

jest.mock("../../utils/logger", () => ({
  error: jest.fn(),
}));

describe("Error Handling Middleware", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Middleware to trigger a custom error
    app.use("/trigger-custom-error", (req, res, next) => {
      const error = new CustomError(400, "Custom Error");
      next(error);
    });

    // Middleware to trigger a generic error
    app.use("/trigger-generic-error", (req, res, next) => {
      const error = new Error("Generic Error");
      next(error);
    });

    // Setup a route that triggers a generic error without a message
    app.use("/trigger-generic-error-no-message", (req, res, next) => {
      const error = new Error();
      next(error);
    });

    app.use(errorHandlingMiddleware);
  });

  it("should handle custom errors", async () => {
    const response = await request(app).get("/trigger-custom-error");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Custom Error" });
  });

  it("should handle generic errors", async () => {
    const response = await request(app).get("/trigger-generic-error");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });

  it("should handle generic errors without a specific message", async () => {
    const response = await request(app).get("/trigger-generic-error-no-message");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Error - Status: 500, Message: Internal Server Error"),
    );
  });
});
