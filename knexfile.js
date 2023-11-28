require("dotenv").config();
const commonConfig = require("./utils/CommonConfigUtil");
const { generateDbConnection } = require("./utils/DbConfigUtil");

const envPrefix = process.env.DB_ENV_PREFIX;
const envType = process.env.NODE_ENV;

const environmentSpecificConfig = {
  connection: generateDbConnection(envPrefix),
};

const knexConfig = {};
knexConfig[envType] = Object.assign({}, commonConfig, environmentSpecificConfig);
module.exports = knexConfig;
