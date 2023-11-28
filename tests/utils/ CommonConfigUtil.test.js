const pathToCommonConfigUtil = "../../utils/CommonConfigUtil";

describe("CommonConfigUtil", () => {
  beforeEach(() => {
    // Clear the cache before each test
    jest.resetModules();
  });

  it("should configure the database client and migrations based on environment variables", () => {
    // Mock environment variables
    process.env.DB_CLIENT = "postgresql";
    process.env.DB_MIG_TABLE_NAME = "db_migrations";
    process.env.DB_MIG_DIRECTORY = "/db/migrations";

    // Re-require the module to reflect new environment variables
    const commonConfig = require(pathToCommonConfigUtil);

    // Assertions
    expect(commonConfig).toEqual({
      client: "postgresql",
      migrations: {
        tableName: "db_migrations",
        directory: "/db/migrations",
      },
    });
  });

  it("should handle different environment variables", () => {
    // Mock different set of environment variables
    process.env.DB_CLIENT = "mysql";
    process.env.DB_MIG_TABLE_NAME = "mysql_migrations";
    process.env.DB_MIG_DIRECTORY = "/mysql/migrations";

    // Re-require the module
    const commonConfig = require(pathToCommonConfigUtil);

    // Assertions
    expect(commonConfig).toEqual({
      client: "mysql",
      migrations: {
        tableName: "mysql_migrations",
        directory: "/mysql/migrations",
      },
    });
  });
});
