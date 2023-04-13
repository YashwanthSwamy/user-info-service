import { Tables } from "../constants/tables";
import userInfoServiceCustomerInfo from "../entities/userInfoServiceCustomerInfo/configuration/definition";
import { createTable } from "./createTable";


export class TableInitializer {

  static async init() {
    await createTable.create(Tables.TABLE_CUSTOMERS, userInfoServiceCustomerInfo.definition);
  }
}
