const logger = require("../utils/Logger");

const requestLogger = (req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
