const db = require("../utils/Database");

class AccessControlRepository {
  async checkAccess(name) {
    // Check if the user is allowed
    const isAllowed = name === process.env.ALLOWED_NAME;

    return isAllowed;
  }

  async addToAccessLog(name) {
    // Log the access attempt
    await db("access_log").insert({
      name,
    });
  }
}

module.exports = AccessControlRepository;
