import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { commonValidators } from "../../../../../src/features/shared/validators/commonValidators";
import { CreateUserValidator } from "../../../../../src/features/user/validators/createUserValidator";

describe("Create User Validator test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let checkIsValidASCIIStub: SinonStub;
  let createUserValidator: CreateUserValidator;

  const userId = "1234"

  const invalidInput = {
    userId: "Â",
    firstName: "Â",
    lastName: "Â",
    email: "Â",
    password: "Â"
  }

  const validInput = {
    userId: userId,
    firstName: "test",
    lastName: "test",
    email: "test@test.com",
    password: "test",
}

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    createUserValidator = new CreateUserValidator(validInput);
    checkIsValidASCIIStub = sandbox.stub(commonValidators, "checkIsValidASCII");
  });

  afterEach(() => {
    checkIsValidASCIIStub.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("validate Email", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] email undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CreateUserValidator(invalidInput).validateEmail();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

  it("validateUserId", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] User ID undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CreateUserValidator(invalidInput).validateUserId();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

  it("validateFirstName", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] First Name undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CreateUserValidator(invalidInput).validateFirstName();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

  it("validateLastName", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] Last Name undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CreateUserValidator(invalidInput).validateLastName();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

  it("validatePassword", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] password undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CreateUserValidator(invalidInput).validatePassword();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });


});
