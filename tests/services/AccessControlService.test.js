const AccessControlService = require("../../services/AccessControlService");
const AccessControlRepository = require("../../repositories/AccessControlRepository");
const db = require("../../utils/Database");

// Mock the database and repository
jest.mock("../../utils/Database");
jest.mock("../../repositories/AccessControlRepository");

describe("AccessControlService", () => {
  let service;

  beforeEach(() => {
    // Clear all mocks before each test
    db.mockClear();
    AccessControlRepository.mockClear();
    service = new AccessControlService();
  });

  it("should allow access and log the name if person is allowed", async () => {
    AccessControlRepository.prototype.checkAccess.mockResolvedValue(true);
    db.insert.mockResolvedValue(); // Mock the insert method of the database

    const result = await service.isPersonAllowed("AllowedName");

    expect(result).toBe(true);
    expect(AccessControlRepository.prototype.addToAccessLog).toHaveBeenCalledWith("AllowedName");
  });

  it("should not allow access and not log the name if person is not allowed", async () => {
    AccessControlRepository.prototype.checkAccess.mockResolvedValue(false);

    const result = await service.isPersonAllowed("NotAllowedName");

    expect(result).toBe(false);
    expect(AccessControlRepository.prototype.addToAccessLog).not.toHaveBeenCalledWith("NotAllowedName");
  });
});
