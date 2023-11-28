const logger = require("../utils/Logger");
const CustomError = require("../models/errors/CustomError");
// eslint-disable-next-line no-unused-vars
const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    // Log the custom error
    logger.error(`Custom Error - Status: ${err.status}, Message: ${err.message}`);

    // Respond with the custom error details
    res.status(err.status).json({ error: err.message });
  } else {
    // Log generic errors
    logger.error(`Error - Status: 500, Message: ${err.message || "Internal Server Error"}`);

    // Respond with generic error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = errorHandlingMiddleware;
