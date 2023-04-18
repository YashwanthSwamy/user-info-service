
import { Tables } from "../../../constants/tables";
import db from "../../../dbconnector";
import { Operation } from "../../../enums/operation";
import { CreateUserModel } from "../../../models/DAO/createUserModel";
import { CreateUserDBResponse } from "../../../models/types/createUserDBResponse";

export class CreateUserCommand {

    async execute(request: CreateUserModel): Promise<number> {

        let dbResponse: Array<CreateUserDBResponse>;
        try {
            dbResponse = (await this.query(request)) as Array<CreateUserDBResponse>;
        } catch (error) {
            if(error.code === "23505"){
                throw Operation.AlreadyExists;
            }
            throw Operation.Error;
        }

        if (dbResponse && dbResponse.length > 0) {
            return dbResponse[0].UserID;
        }
        console.log(`[DB] Already exist`, { inputData: request });
        throw Operation.AlreadyExists;
    }

    private query(request: CreateUserModel) {
        const query = db.dbConnector
            .insert(request)
            .into(Tables.TABLE_CUSTOMERS)
            .returning(["UserID"]);
        return query.then((response: any) => response);
    }
}

const createUserCommand = new CreateUserCommand();
export default createUserCommand;