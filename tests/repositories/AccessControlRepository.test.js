require("dotenv").config();
const AccessControlRepository = require("../../repositories/AccessControlRepository");
const db = require("../../utils/Database");

jest.mock("../../utils/Database");

describe("AccessControlRepository", () => {
  let repository;

  beforeEach(() => {
    process.env.ALLOWED_NAME = "AllowedUser";
    repository = new AccessControlRepository();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("checkAccess", () => {
    it("should return true for an allowed user", async () => {
      const isAllowed = await repository.checkAccess(process.env.ALLOWED_NAME);
      expect(isAllowed).toBe(true);
    });

    it("should return false for a non-allowed user", async () => {
      const isAllowed = await repository.checkAccess("NotAllowedUser");
      expect(isAllowed).toBe(false);
    });

    it("should return true for a valid access code", async () => {
      const accessCode = "validAccessCode";
      db.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue({}),
      });

      const isAllowed = await repository.checkAccess(null, accessCode);
      expect(isAllowed).toBe(true);
    });

    it("should return false for an invalid access code", async () => {
      const accessCode = "invalidAccessCode";
      db.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue(null),
      });

      const isAllowed = await repository.checkAccess(null, accessCode);
      expect(isAllowed).toBe(false);
    });
  });

  describe("addToAccessLog", () => {
    it("should log the user access in the database", async () => {
      const userName = process.env.ALLOWED_NAME;
      db.mockReturnValue({ insert: jest.fn().mockResolvedValue(null) }); // Mocking the db insert method

      await repository.addToAccessLog(userName);

      expect(db).toHaveBeenCalledWith("access_log");
      expect(db().insert).toHaveBeenCalledWith({ name: userName });
    });
  });
});
