const bodyParser = require("body-parser");
const setupRoutes = require("../routes");
const errorHandlingMiddleware = require("./ErrorHandlingMiddleware");
const requestLogger = require("./RequestLogger");

module.exports = function setupMiddleware(app) {
  // Request Logger Middleware
  app.use(requestLogger);

  // Body Parser Middleware
  app.use(bodyParser.json());

  // Setup Routes
  setupRoutes(app);

  // Error Handling Middleware
  app.use(errorHandlingMiddleware);
};
