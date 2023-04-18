import sinon, { SinonStub } from "sinon";
import { expect } from "chai";
import { commonValidators } from "../../../../../src/features/shared/validators/commonValidators";
import { GetUserInfoValidator } from "../../../../../src/features/user/validators/getUserInfoValidator";

describe("Get User Info Validator test cases", () => {
  let sandbox: sinon.SinonSandbox;
  let checkIsValidASCIIStub: SinonStub;
  let getUserInfoValidator: GetUserInfoValidator;

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
    getUserInfoValidator = new GetUserInfoValidator(validInput);
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
      new GetUserInfoValidator(invalidInput).validateUserId();
    } catch (error) {
        expect(error).instanceOf(Error);
        expect(error.message).equals(expectedMessage);
    }
  });

});
