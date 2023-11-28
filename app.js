const express = require("express");
const setupMiddleware = require("./middleware/SetupMiddleware");
const logger = require("./utils/Logger");

const app = express();

// Setup all middlewares
setupMiddleware(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
