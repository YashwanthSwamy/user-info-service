import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { commonValidators } from "../../../../../src/features/shared/validators/commonValidators";
import { CheckUserAuthorizationValidator } from "../../../../../src/features/user/validators/checkUserAuthorizationValidator";

describe("Check User Authorization Validator test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let checkIsValidASCIIStub: SinonStub;
  let checkUserAuthorizationValidator: CheckUserAuthorizationValidator;

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
    checkUserAuthorizationValidator = new CheckUserAuthorizationValidator(validInput);
    checkIsValidASCIIStub = sandbox.stub(commonValidators, "checkIsValidASCII");
  });

  afterEach(() => {
    checkIsValidASCIIStub.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("validateUserId", () => {
    // Arrange
    const expectedMessage = "[VALIDATION] User ID undefined/ not ASCII";
    checkIsValidASCIIStub.returns(false);

    // Act and Assert
    try {
      new CheckUserAuthorizationValidator(invalidInput).validateUserId();
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
      new CheckUserAuthorizationValidator(invalidInput).validatePassword();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

});
