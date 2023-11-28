/**
 * Common database configuration.
 */
const commonConfig = {
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: process.env.DB_MIG_TABLE_NAME,
    directory: process.env.DB_MIG_DIRECTORY,
  },
};

module.exports = commonConfig;
