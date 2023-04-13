import { expect } from "chai";
import sinon, { SinonStub } from "sinon";
import { commonValidators } from "../../../src/features/shared/validators/commonValidators";
import validator from "validator";


describe("CommonValidator", () => {

  let sandbox: sinon.SinonSandbox;
  let validatorIsAsciiStub: SinonStub;
  let validatorIsIntStub: SinonStub;
  let validatorIsFloatStub: SinonStub;
  let validatorIsIsoStub: SinonStub;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    validatorIsAsciiStub = sandbox.stub(validator, "isAscii");
    validatorIsIntStub = sandbox.stub(validator, "isInt");
    validatorIsIsoStub = sandbox.stub(validator, "isISO8601");
    validatorIsFloatStub = sandbox.stub(validator, "isFloat");
  });

  afterEach(() => {
    validatorIsAsciiStub.restore();
    validatorIsIntStub.restore();
    validatorIsIsoStub.restore();
    validatorIsFloatStub.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("checkIsValidASCII_WhenUndefinedInputReceived_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsValidASCII(undefined);

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidASCII_WhenInvalidInputReceived_ShouldreturnFalse", () => {
    // Arrange
    validatorIsAsciiStub.returns(false);

    // Act
    const actual = commonValidators.checkIsValidASCII("abc123");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidASCII_WhenValidInputReceived_ShouldreturnTrue", () => {
    // Arrange
    validatorIsAsciiStub.returns(true);

    // Act
    const actual = commonValidators.checkIsValidASCII("abc");

    // Assert
    expect(actual).equals(true);
  });

  it("checkIsWholeNumber_WhenUndefinedInputReceived_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsWholeNumber(undefined);

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsWholeNumber_WhenNonIntInputReceived_ShouldreturnFalse", () => {
    // Arrange
    validatorIsIntStub.returns(false);

    // Act
    const actual = commonValidators.checkIsWholeNumber("abc");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsWholeNumber_WhenValidInputReceived_ShouldreturnTrue", () => {
    // Arrange
    validatorIsIntStub.returns(true);

    // Act
    const actual = commonValidators.checkIsWholeNumber("123");

    // Assert
    expect(actual).equals(true);
  });

  it("checkIsFloat_WhenUndefinedInputReceived_ShouldReturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsFloat(undefined);

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsFloat_WhenInvalidInputReceived_ShouldReturnFalse", () => {
    // Arrange
    validatorIsFloatStub.returns(false);

    // Act
    const actual = commonValidators.checkIsFloat("abc");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsFloat_WhenValidInputReceived_ShouldReturnTrue", () => {
    // Arrange
    validatorIsFloatStub.returns(true);

    // Act
    const actual = commonValidators.checkIsFloat("123.0", 0, 100);

    // Assert
    expect(actual).equals(true);
  });

  it("checkIsValidISO_WhenUndefinedInputReceived_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsValidISO(undefined);

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidISO_WhenInvalidInputReceived_ShouldreturnFalse", () => {
    // Arrange
    validatorIsIsoStub.returns(false);

    // Act
    const actual = commonValidators.checkIsValidISO("abc");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidISO_WhenValidInputReceived_ShouldreturnTrue", () => {
    // Arrange
    validatorIsIsoStub.returns(true);

    // Act
    const actual = commonValidators.checkIsValidISO("2021-06-14T05:15:50.410Z");

    // Assert
    expect(actual).equals(true);
  });

  it("checkIsValidDateTimeDifference_WhenUndefinedStartTimeReceived_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsValidDateTimeDifference(undefined, "2021-06-14T05:15:50.410Z");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidDateTimeDifference_WhenUndefinedEndTimeReceived_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsValidDateTimeDifference("2021-06-14T05:15:50.410Z", undefined);

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidDateTimeDifference_WhenEndTimeLessThanStartTime_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.checkIsValidDateTimeDifference("2021-06-14T05:15:50.410Z", "2021-05-14T05:15:50.410Z");

    // Assert
    expect(actual).equals(false);
  });

  it("checkIsValidDateTimeDifference_WhenEndTimeGreaterThanStartTime_ShouldreturnTrue", () => {
    // Act
    const actual = commonValidators.checkIsValidDateTimeDifference("2021-06-14T05:15:50.410Z", "2021-07-14T05:15:50.410Z");

    // Assert
    expect(actual).equals(true);
  });

  it("validateIntegerArray_WhenIntegerInArrayNotaNumber_ShouldreturnFalse", () => {
    // Act
    const actual = commonValidators.validateIntegerArray(['abc']);

    // Assert
    expect(actual).equals(false);
  });

  it("validateIntegerArray_WhenIntegerInArrayIsNumber_ShouldreturnTrue", () => {
    // Arrange
    validatorIsIntStub.returns(true);

    // Act
    const actual = commonValidators.validateIntegerArray(['2']);

    // Assert
    expect(actual).equals(true);
  });
});
