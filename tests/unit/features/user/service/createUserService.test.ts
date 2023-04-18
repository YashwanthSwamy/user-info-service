import sinon from "sinon";
import { SinonStub } from "sinon";
import { expect } from "chai";
import createUserCommand from "../../../../../src/externalServices/database/entities/userInfoServiceCustomerInfo/command/createUserCommand";
import { Operation } from "../../../../../src/externalServices/database/enums/operation";
import {createUserService} from "../../../../../src/features/user/service/createUserService";

describe("create User Service", () => {
    let sandbox: sinon.SinonSandbox;
    let createUserCommandStub: SinonStub;

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
        createUserCommandStub = sandbox.stub(createUserCommand, "execute");
    });

    afterEach(() => {
        sandbox.reset();
        createUserCommandStub.restore();
    });

    after(() => {
        sandbox.restore();
    });

    it("success on creation", async () => {
        // Arrange
        createUserCommandStub.resolves("1234");
        const expectedResult = { userId: "1234", status: Operation.Success};

        // Act
        const actualResult = await createUserService.create(userInfo);

        // Assert
        expect(actualResult).to.eql(expectedResult);
    });

    it("error on creation", async () => {
        // Arrange
        createUserCommandStub.throws(Operation.Error);

        // Act
        const actualResult = await createUserService.create(userInfo);

        // Assert
        expect(actualResult).to.eql({ userId: undefined, status: 2 });
    });
});