import { commonValidators } from "../../shared/validators/commonValidators";
import { GetUserInfoModel } from "../model/getUserInfoModel";

export class GetUserInfoValidator {
    input: GetUserInfoModel;

    constructor(request: GetUserInfoModel) {
        this.input = request;
    }

    validateUserId() {
        if (!commonValidators.checkIsValidASCII(this.input.userId)) {
          throw new Error("[VALIDATION] User ID undefined/ not ASCII");
        }
    
        return this;
      }
}