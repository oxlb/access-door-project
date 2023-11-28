const AccessControlRepository = require("../repositories/AccessControlRepository");

class AccessControlService {
  constructor() {
    this.repository = new AccessControlRepository();
  }

  async isPersonAllowed(name, accessCode) {
    const allowed = await this.repository.checkAccess(name, accessCode);
    if (allowed) {
      await this.repository.addToAccessLog(name);
    }

    return allowed;
  }
}

module.exports = AccessControlService;
