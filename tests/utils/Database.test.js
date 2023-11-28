const knex = require("knex");
const knexConfig = require("../../knexfile");
const env = process.env.NODE_ENV;

describe("Database Connection Setup", () => {
  it("should require the 'knex' module", () => {
    expect(knex).toBeDefined();
  });

  it("should require the 'knexConfig' module", () => {
    expect(knexConfig).toBeDefined();
  });

  it("should use the 'test' environment by default", () => {
    expect(env).toBe("test");
  });

  it("should create a database connection", () => {
    const db = require("../../utils/Database"); // Assuming your module is named 'db.js'
    expect(db).toBeDefined();
  });
});
