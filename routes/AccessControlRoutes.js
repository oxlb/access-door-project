const AccessControlService = require("../services/AccessControlService");
const CustomError = require("../models/errors/CustomError");
const service = new AccessControlService();

async function handleAccessControl(req, res, next) {
  try {
    const { id, name, accessCode } = req.body;
    if (!id || !name) {
      throw new CustomError(400, "Missing id or name");
    }

    const allowed = await service.isPersonAllowed(name, accessCode);
    if (!allowed) {
      throw new CustomError(403, "Access Denied");
    } else {
      res.send({ message: "Access Granted" });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
}

module.exports = {
  handleAccessControl,
};
