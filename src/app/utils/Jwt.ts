import jwt from "jsonwebtoken";
import { AdmRepository } from "../repository/AdmRepository.js";
export class JwtToken {
  static async getCodeToken<$Payload extends admClient>(
    user: $Payload,
    secreteKey: string,
    time: jwt.SignOptions
  ): Promise<string> {
    if (user.client) {
      return jwt.sign(user, secreteKey, time);
    } else {
      const permissionss: string[] | undefined = user.role_adm?.map(
        ({ role }) => {
          return role.role_name;
        }
      );
      return jwt.sign(
        { ...user, permissions: permissionss ? permissionss : [] },
        secreteKey,
        time
      );
    }
  }
}
