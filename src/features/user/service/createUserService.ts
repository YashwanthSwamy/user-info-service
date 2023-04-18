import createUserCommand from "../../../externalServices/database/entities/userInfoServiceCustomerInfo/command/createUserCommand";
import { Operation } from "../../../externalServices/database/enums/operation";
import { CreateUserResponseModel } from "../model/createUserResponseModel";
import { CreateUserModel } from "../model/createUserModel";

class CreateUserService {
    async create(customerInfo: CreateUserModel) : Promise<CreateUserResponseModel> {
        try {
            const result = await createUserCommand.execute(
                {
                    UserID: customerInfo.userId,
                    FirstName: customerInfo.firstName,
                    LastName: customerInfo.lastName,
                    Email: customerInfo.email,
                    Password: customerInfo.password,
                });
            return {
                userId: result,
                status: Operation.Success
            };
        } catch (operation: any) {
            return {
                userId: undefined,
                status: operation
            };
        }
    }
}

const createUserService = new CreateUserService();
export { createUserService };