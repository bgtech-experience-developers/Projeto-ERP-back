import { JoiValidation } from "../utils/joi.js";

export class GuardCLient {
  static TypeGuardCreateClient<$Interface>(body: unknown): body is $Interface {
    return true;
  }
}
