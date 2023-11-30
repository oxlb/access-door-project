const db = require("../utils/Database");

class AccessControlRepository {
  async checkAccess(name, accessCode) {
    // Check if the user is allowed
    if (name === process.env.ALLOWED_NAME) {
      return true; // Allow access for "Joe" or other person
    }

    // Check if the access code is empty or null
    if (!accessCode) {
      return false; // Access denied if accessCode is empty or null
    }

    // Check if the access code is valid
    const validAccessCode = await this.isValidAccessCode(accessCode);

    return validAccessCode;
  }

  async addToAccessLog(name) {
    // Log the access attempt
    await db("access_log").insert({
      name,
    });
  }

  async isValidAccessCode(accessCode) {
    // Query the database to check if the access code exists and is valid
    const result = await db("access_code").where({ code: accessCode }).first();

    return !!result; // Return true if a valid access code is found, false otherwise
  }
}

module.exports = AccessControlRepository;
