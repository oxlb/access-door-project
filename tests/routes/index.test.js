const express = require("express");
const request = require("supertest");
const setupRoutes = require("../../routes/index");

jest.mock("../../routes/AccessControlRoutes", () => ({
  handleAccessControl: jest.fn((req, res) => {
    res.status(200).send({ message: "Mocked Access Control" });
  }),
}));

describe("Route Index Tests", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    setupRoutes(app);
  });

  it("responds at the health check endpoint", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "ok",
        timestamp: expect.any(String),
      }),
    );
  });

  it("responds to access-door route", async () => {
    const response = await request(app).post("/access-door").send({ id: "123", name: "Joe" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Mocked Access Control" });
  });
});
