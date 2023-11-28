const AccessControlRepository = require("../repositories/AccessControlRepository");

class AccessControlService {
  constructor() {
    this.repository = new AccessControlRepository();
  }

  async isPersonAllowed(name) {
    const allowed = await this.repository.checkAccess(name);
    if (allowed) {
      await this.repository.addToAccessLog(name);
    }

    return allowed;
  }
}

module.exports = AccessControlService;
