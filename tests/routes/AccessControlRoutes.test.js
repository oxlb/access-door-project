const AccessControlService = require("../../services/AccessControlService");
const CustomError = require("../../models/errors/CustomError");
const AccessControlRoutes = require("../../routes/AccessControlRoutes");

describe("handleAccessControl", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { send: jest.fn() };
    next = jest.fn();
  });

  it("should return 'Access Granted' if both id and name are provided and person is allowed", async () => {
    req.body.id = 1;
    req.body.name = "Joe";

    // Mock the isPersonAllowed function to return true
    AccessControlService.prototype.isPersonAllowed = jest.fn().mockResolvedValue(true);

    await AccessControlRoutes.handleAccessControl(req, res, next);

    expect(res.send).toHaveBeenCalledWith({ message: "Access Granted" });
  });

  it("should throw a CustomError with status code 400 if either id or name is missing", async () => {
    req.body.id = 1;

    await AccessControlRoutes.handleAccessControl(req, res, next);

    expect(next).toHaveBeenCalledWith(new CustomError(400, "Missing id or name"));
  });

  it("should throw a CustomError with status code 403 if person is not allowed", async () => {
    req.body.id = 1;
    req.body.name = "John";

    // Mock the isPersonAllowed function to return false
    AccessControlService.prototype.isPersonAllowed = jest.fn().mockResolvedValue(false);

    await AccessControlRoutes.handleAccessControl(req, res, next);

    expect(next).toHaveBeenCalledWith(new CustomError(403, "Access Denied"));
  });

  it("should call the next middleware with an error if an exception is thrown", async () => {
    req.body.id = 1;
    req.body.name = "John";

    // Mock the isPersonAllowed function to throw an error
    AccessControlService.prototype.isPersonAllowed = jest.fn().mockRejectedValue(new Error("Access Denied"));

    await AccessControlRoutes.handleAccessControl(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Access Denied"));
  });
});
