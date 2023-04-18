import sinon from "sinon";
import { SinonStub } from "sinon";
import { expect } from "chai";
import HttpStatus from "http-status-codes";

import {getUserQuery} from "../../../../../src/externalServices/database/entities/userInfoServiceCustomerInfo/query/getUserQuery";
import { Operation } from "../../../../../src/externalServices/database/enums/operation";
import {getUserService} from "../../../../../src/features/user/service/getUserService";

describe("Get User Service", () => {
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

    it("fetch on succesfull", async () => {
        // Arrange
        getUserQueryStub.resolves(userInfo);
        const expectedResult = {
            data: userInfo,
            status: HttpStatus.OK
        };

        // Act
        const actualResult = await getUserService.get(userInfo.userId);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("error on creation", async () => {
        // Arrange
        getUserQueryStub.throws(Operation.Error);

        // Act
        const actualResult = await getUserService.get(userInfo.userId);

        // Assert
        expect(actualResult).to.eql({ data: undefined, status: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});