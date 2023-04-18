import sinon, { SinonSpy, SinonStub } from "sinon";
import HttpStatus from "http-status-codes";
import { CreateUserValidator } from "../../../../../src/features/user/validators/createUserValidator";
import { createUserInfoMiddleware } from "../../../../../src/features/user/middleware/createUserInfoMiddleware";

describe("create User Info Middleware test cases", () => {
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
    validateUserIdStub = sandbox.stub(CreateUserValidator.prototype, "validateUserId").returns(CreateUserValidator.prototype);
    validateLastNameStub = sandbox.stub(CreateUserValidator.prototype, "validateLastName").returns(CreateUserValidator.prototype);
    validateFirstNameStub = sandbox.stub(CreateUserValidator.prototype, "validateFirstName").returns(CreateUserValidator.prototype);
    validateEmailStub = sandbox.stub(CreateUserValidator.prototype, "validateEmail").returns(CreateUserValidator.prototype);
    validatePasswordStub = sandbox.stub(CreateUserValidator.prototype, "validatePassword").returns(CreateUserValidator.prototype);

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
    createUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Last Name", () => {
    // Arrange
    validateLastNameStub.throws(new Error("[VALIDATION] Last Name undefined/ not ASCII"));
    // Act
    createUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate First Name", () => {
    // Arrange
    validateFirstNameStub.throws(new Error("[VALIDATION] First Name undefined/ not ASCII"));
    // Act
    createUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Email", () => {
    // Arrange
    validateEmailStub.throws(new Error("[VALIDATION] email undefined/ not ASCII"));
    // Act
    createUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

  it("validate Password", () => {
    // Arrange
    validatePasswordStub.throws(new Error("[VALIDATION] password undefined/ not ASCII"));
    // Act
    createUserInfoMiddleware.validateRequest(request, response, next);

    // Assert
    sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
  });

});
