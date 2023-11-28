const { mergeDatabaseConfig } = require("../../utils/MergeConfigUtil");

describe("mergeDatabaseConfig", () => {
  const commonConfig = {
    client: "commonClient",
    migrations: {
      tableName: "commonTable",
    },
  };

  it("should correctly merge common and environment-specific configs", () => {
    const environmentConfig = {
      local: {
        connection: "localConnection",
      },
      prod: {
        connection: "prodConnection",
      },
    };

    const mergedConfig = mergeDatabaseConfig(commonConfig, environmentConfig);

    // Checks for the 'local' configuration
    expect(mergedConfig.local.client).toBe(commonConfig.client);
    expect(mergedConfig.local.migrations.tableName).toBe(commonConfig.migrations.tableName);
    expect(mergedConfig.local.connection).toBe(environmentConfig.local.connection);

    // Checks for the 'prod' configuration
    expect(mergedConfig.prod.client).toBe(commonConfig.client);
    expect(mergedConfig.prod.migrations.tableName).toBe(commonConfig.migrations.tableName);
    expect(mergedConfig.prod.connection).toBe(environmentConfig.prod.connection);
  });

  it("should handle empty environment-specific config", () => {
    const environmentConfig = {};

    const mergedConfig = mergeDatabaseConfig(commonConfig, environmentConfig);

    expect(mergedConfig).toEqual({});
  });

  it("should handle null or undefined environment-specific config", () => {
    const mergedConfigWithNull = mergeDatabaseConfig(commonConfig, null);
    const mergedConfigWithUndefined = mergeDatabaseConfig(commonConfig, undefined);

    expect(mergedConfigWithNull).toEqual({});
    expect(mergedConfigWithUndefined).toEqual({});
  });

  it("should not include environments not present in environment-specific config", () => {
    const environmentConfig = {
      local: {
        connection: "localConnection",
      },
    };

    const mergedConfig = mergeDatabaseConfig(commonConfig, environmentConfig);

    expect(mergedConfig).toHaveProperty("local");
    expect(mergedConfig).not.toHaveProperty("prod");
  });

  it("should not mutate the original commonConfig object", () => {
    const environmentConfig = {
      local: {
        connection: "localConnection",
      },
    };

    mergeDatabaseConfig(commonConfig, environmentConfig);

    expect(commonConfig).not.toHaveProperty("local");
  });

  it("should override common properties with environment-specific properties", () => {
    const environmentConfig = {
      local: {
        client: "localClient",
        connection: "localConnection",
      },
    };

    const mergedConfig = mergeDatabaseConfig(commonConfig, environmentConfig);

    expect(mergedConfig.local.client).toBe("localClient");
  });

  // Add more tests as needed for additional edge cases
});
