import sinon from "sinon";
import { SinonStub } from "sinon";
import { expect } from "chai";
import HttpStatus from "http-status-codes";
import { getUserQuery } from "../../../../../src/externalServices/database/entities/userInfoServiceCustomerInfo/query/getUserQuery";
import { Operation } from "../../../../../src/externalServices/database/enums/operation";
import { checkAuthorizationService } from "../../../../../src/features/user/service/checkAuthorizationService";

describe("check Authorization Service", () => {
    let sandbox: sinon.SinonSandbox;
    let getUserQueryStub: SinonStub;

    const userInfo = {
        userId: "1234",
        firstName: "test",
        lastName: "test",
        email: "test@test.com",
        password: "test",
    }

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        getUserQueryStub = sandbox.stub(getUserQuery, "execute");
    });

    afterEach(() => {
        sandbox.reset();
        getUserQueryStub.restore();
    });

    after(() => {
        sandbox.restore();
    });

    it("password matched", async () => {
        // Arrange
        getUserQueryStub.resolves(userInfo);
        const expectedResult = { data: userInfo, status: HttpStatus.OK };

        // Act
        const actualResult = await checkAuthorizationService.getCustomerInfoIfAuthorized(userInfo.userId, userInfo.password);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("password mismatch", async () => {
        // Arrange
        getUserQueryStub.resolves({
            userId: "1234",
            firstName: "test",
            lastName: "test",
            email: "test@test.com",
            password: "wrong",
        });

        // Act
        const actualResult = await checkAuthorizationService.getCustomerInfoIfAuthorized(userInfo.userId, userInfo.password);

        // Assert
        expect(actualResult).to.eql({ data: undefined, status: HttpStatus.INTERNAL_SERVER_ERROR });
    });

    it("error on creation", async () => {
        // Arrange
        getUserQueryStub.throws(Operation.Error);

        // Act
        const actualResult = await checkAuthorizationService.getCustomerInfoIfAuthorized(userInfo.userId, userInfo.password);

        // Assert
        expect(actualResult).to.eql({ data: undefined, status: 500 });
    });
});