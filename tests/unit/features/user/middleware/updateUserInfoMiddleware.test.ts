import sinon, { SinonSpy, SinonStub } from "sinon";
import HttpStatus from "http-status-codes";
import { UpdateUserInfoValidator } from "../../../../../src/features/user/validators/updateUserInfoValidator";
import { updateUserInfoMiddleware } from "../../../../../src/features/user/middleware/updateUserInfoMiddleware";

describe("update User Info Middleware test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let validateUserIdStub: SinonStub;
  let validateLastNameStub: SinonStub;
  let validateFirstNameStub: SinonStub;
  let validateEmailStub: SinonStub;
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
    validateUserIdStub = sandbox.stub(UpdateUserInfoValidator.prototype, "validateUserId").returns(UpdateUserInfoValidator.prototype);
    validateLastNameStub = sandbox.stub(UpdateUserInfoValidator.prototype, "validateLastName").returns(UpdateUserInfoValidator.prototype);
    validateFirstNameStub = sandbox.stub(UpdateUserInfoValidator.prototype, "validateFirstName").returns(UpdateUserInfoValidator.prototype);
    validateEmailStub = sandbox.stub(UpdateUserInfoValidator.prototype, "validateEmail").returns(UpdateUserInfoValidator.prototype);
    validatePasswordStub = sandbox.stub(UpdateUserInfoValidator.prototype, "validatePassword").returns(UpdateUserInfoValidator.prototype);

    request = {
        params: {
            userId: userId,
        },
        body: {
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
    validateLastNameStub.restore();
    validateFirstNameStub.restore();
    validateEmailStub.restore();
    validatePasswordStub.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("validate UserId", () => {
    // Arrange
    validateUserIdStub.throws(new Error("[VALIDATION] User ID undefined/ not ASCII"));

    // Act
    updateUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Last Name", () => {
    // Arrange
    validateLastNameStub.throws(new Error("[VALIDATION] Last Name undefined/ not ASCII"));
    // Act
    updateUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate First Name", () => {
    // Arrange
    validateFirstNameStub.throws(new Error("[VALIDATION] First Name undefined/ not ASCII"));
    // Act
    updateUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Email", () => {
    // Arrange
    validateEmailStub.throws(new Error("[VALIDATION] email undefined/ not ASCII"));
    // Act
    updateUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Password", () => {
    // Arrange
    validatePasswordStub.throws(new Error("[VALIDATION] password undefined/ not ASCII"));
    // Act
    updateUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

});
