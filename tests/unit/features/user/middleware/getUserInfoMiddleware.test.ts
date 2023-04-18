import sinon, { SinonSpy, SinonStub } from "sinon";
import HttpStatus from "http-status-codes";
import { GetUserInfoValidator } from "../../../../../src/features/user/validators/getUserInfoValidator";
import { getUserInfoMiddleware } from "../../../../../src/features/user/middleware/getUserInfoMiddleware";

describe(" check Authorization Middleware test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let validateUserIdStub: SinonStub;
  
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
    validateUserIdStub = sandbox.stub(GetUserInfoValidator.prototype, "validateUserId").returns(GetUserInfoValidator.prototype);

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
  });

  after(() => {
    sandbox.restore();
  });

  it("validate UserId", () => {
    // Arrange
    validateUserIdStub.throws(new Error("[VALIDATION] User ID undefined/ not ASCII"));

    // Act
    getUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

});
