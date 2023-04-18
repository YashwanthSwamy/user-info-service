import sinon, { SinonSpy, SinonStub } from "sinon";
import HttpStatus from "http-status-codes";
import { CheckUserAuthorizationValidator } from "../../../../../src/features/user/validators/checkUserAuthorizationValidator";
import { checkAuthorizationMiddleware } from "../../../../../src/features/user/middleware/checkAuthorizationMiddleware";

describe(" check Authorization Middleware test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let validateUserIdStub: SinonStub;
  let validatePasswordStub: SinonStub;
  const userId = "1234";
  let nextSpy: SinonSpy;

  let request: any,
    response: any,
    next: any;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    nextSpy = sandbox.spy();
    validateUserIdStub = sandbox.stub(CheckUserAuthorizationValidator.prototype, "validateUserId").returns(CheckUserAuthorizationValidator.prototype);
    validatePasswordStub = sandbox.stub(CheckUserAuthorizationValidator.prototype, "validatePassword").returns(CheckUserAuthorizationValidator.prototype);

    request = {
        params: {
            userId: userId,
        },
        body: {
            userId: userId,
            firstName: "test",
            lastName: "test",
            email: "test@test.com",
            password: "test",
        }
    };
    response = {
      send: sandbox.spy(),
      status: sandbox.spy()
    };
    next = nextSpy;
  });

  afterEach(() => {
    validateUserIdStub.restore();
    validatePasswordStub.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("validate UserId", () => {
    // Arrange
    validateUserIdStub.throws(new Error("[VALIDATION] User ID undefined/ not ASCII"));

    // Act
    checkAuthorizationMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Password", () => {
    // Arrange
    validatePasswordStub.throws(new Error("[VALIDATION] password undefined/ not ASCII"));
    // Act
    checkAuthorizationMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

});
