// index.js (under the routes folder)

const express = require("express");
const router = express.Router();
const { handleAccessControl } = require("./AccessControlRoutes");

// Use the handleAccessControl function for the "/access-door" route
router.post("/access-door", handleAccessControl);

// Health Check Endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = function setupRoutes(app) {
  app.use("/", router);
};
