import bycript from "bcrypt";
export class BycriptCripto {
  static comparePassword(
    passwordUser: string,
    passwordCripto: string
  ): boolean {
    return bycript.compareSync(passwordUser, passwordCripto);
  }
  static createPassword(passwordRegular: string, salts: number) {
    return bycript.hashSync(passwordRegular, salts);
  }
}
