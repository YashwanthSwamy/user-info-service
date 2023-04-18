import sinon from "sinon";
import { SinonStub } from "sinon";
import { expect } from "chai";
import HttpStatus from "http-status-codes";

import updateUserCommand from "../../../../../src/externalServices/database/entities/userInfoServiceCustomerInfo/command/updateUserCommand";
import { Operation } from "../../../../../src/externalServices/database/enums/operation";
import {updateUserService} from "../../../../../src/features/user/service/updateUserService";

describe("Update User Service", () => {
    let sandbox: sinon.SinonSandbox;
    let updateUserCommandStub: SinonStub;

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
        updateUserCommandStub = sandbox.stub(updateUserCommand, "execute");
    });

    afterEach(() => {
        sandbox.reset();
        updateUserCommandStub.restore();
    });

    after(() => {
        sandbox.restore();
    });

    it("update on succesfull", async () => {
        // Arrange
        updateUserCommandStub.resolves(userInfo);
        const expectedResult = {
            data: userInfo,
            status: HttpStatus.OK
        };

        // Act
        const actualResult = await updateUserService.update(userInfo.userId, userInfo);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("error on creation", async () => {
        // Arrange
        updateUserCommandStub.throws(Operation.Error);

        // Act
        const actualResult = await updateUserService.update(userInfo.userId, userInfo);

        // Assert
        expect(actualResult).to.eql({ data: undefined, status: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});