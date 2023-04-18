import sinon, { SinonStub } from 'sinon';
import HttpStatus from 'http-status-codes';
import { Operation } from '../../../../../src/externalServices/database/enums/operation';
import { userInfoController } from '../../../../../src/features/user/controllers/userInfoController';
import { createUserService } from '../../../../../src/features/user/service/createUserService';
import { updateUserService } from '../../../../../src/features/user/service/updateUserService';
import { getUserService } from '../../../../../src/features/user/service/getUserService';
import { checkAuthorizationService } from '../../../../../src/features/user/service/checkAuthorizationService';

describe("addUser", () => {
    let sandbox: sinon.SinonSandbox;
    let request: any;
    let response: any;
    let createUserServiceStub: SinonStub;

    const userId = "1234";

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        request = {
            query: {},
            body: {
                userId: userId,
                firstName: "test",
                lastName: "test",
                email: "test@test.com",
                password: "test",
            }
        };
        response = {
            send: sandbox.spy(),
            status: sandbox.spy(),
        };
        createUserServiceStub = sinon.stub(createUserService, "create");
    });

    afterEach(() => {
        createUserServiceStub.restore();
        sandbox.reset();
    });

    after(() => {
        sandbox.restore();
    });

    it("Add user successfull", async () => {
        // Arrange
        createUserServiceStub.resolves({
            userId: userId,
            status: Operation.Success
        });

        // Act
        await userInfoController.addUser(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.OK);
        sinon.assert.calledWith(response.send, { userId: userId, status: 200 });
    });

    it("user already exist", async () => {
        // Arrange
        createUserServiceStub.resolves({
            userId: userId,
            status: Operation.AlreadyExists
        });

        // Act
        await userInfoController.addUser(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.CONFLICT);
        sinon.assert.calledWith(response.send, { userId: userId, status: 409 });
    });

    it("user failed", async () => {
        // Arrange
        createUserServiceStub.resolves({
            userId: userId,
            status: Operation.Error
        });

        // Act
        await userInfoController.addUser(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.BAD_REQUEST);
        sinon.assert.calledWith(response.send, { userId: userId, status: 400 });
    });
});

describe("get User", () => {
    let sandbox: sinon.SinonSandbox;
    let request: any;
    let response: any;
    let getUserServiceStub: SinonStub;

    const userId = "1234";

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        request = {
            params: {
                userId: userId,
            },
            body: {
                userId: userId,
                firstName: "test",
                lastName: "test",
                email: "test@test.com",
                password: "test",
            }
        };
        response = {
            send: sandbox.spy(),
            status: sandbox.spy(),
        };
        getUserServiceStub = sinon.stub(getUserService, "get");
    });

    afterEach(() => {
        getUserServiceStub.restore();
        sandbox.reset();
    });

    after(() => {
        sandbox.restore();
    });

    it("get User Info successfull", async () => {
        // Arrange
        getUserServiceStub.resolves({
            data: userId,
            status: HttpStatus.OK
        });

        // Act
        await userInfoController.getUserInfo(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.OK);
        sinon.assert.calledWith(response.send, userId);
    });
});

describe("update User", () => {
    let sandbox: sinon.SinonSandbox;
    let request: any;
    let response: any;
    let updateUserServiceStub: SinonStub;

    const userId = "1234";

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        request = {
            params: {
                userId: userId,
            },
            body: {
                userId: userId,
                firstName: "test",
                lastName: "test",
                email: "test@test.com",
                password: "test",
            }
        };
        response = {
            send: sandbox.spy(),
            status: sandbox.spy(),
        };
        updateUserServiceStub = sinon.stub(updateUserService, "update");
    });

    afterEach(() => {
        updateUserServiceStub.restore();
        sandbox.reset();
    });

    after(() => {
        sandbox.restore();
    });

    it("update User successfull", async () => {
        // Arrange
        updateUserServiceStub.resolves({
            data: userId,
            status: HttpStatus.OK
        });

        // Act
        await userInfoController.updateUser(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.OK);
        sinon.assert.calledWith(response.send, userId);
    });
});

describe("check Authorization", () => {
    let sandbox: sinon.SinonSandbox;
    let request: any;
    let response: any;
    let checkAuthorizationServiceStub: SinonStub;

    const userId = "1234";

    before(() => {
        sandbox = sinon.createSandbox();
    });

    beforeEach(() => {
        request = {
            query: {},
            body: {
                userId: userId,
                firstName: "test",
                lastName: "test",
                email: "test@test.com",
                password: "test",
            }
        };
        response = {
            send: sandbox.spy(),
            status: sandbox.spy(),
        };
        checkAuthorizationServiceStub = sinon.stub(checkAuthorizationService, "getCustomerInfoIfAuthorized");
    });

    afterEach(() => {
        checkAuthorizationServiceStub.restore();
        sandbox.reset();
    });

    after(() => {
        sandbox.restore();
    });

    it("check Authorization Service  successfull", async () => {
        // Arrange
        checkAuthorizationServiceStub.resolves({
            data: userId,
            status: HttpStatus.OK
        });

        // Act
        await userInfoController.checkAuthorization(request, response);

        // Assert
        sinon.assert.calledWith(response.status, HttpStatus.OK);
        sinon.assert.calledWith(response.send, userId);
    });
});