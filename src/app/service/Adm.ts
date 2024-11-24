import { object } from "joi";
import { AllError } from "../error/AllError.js";
import { AdmRepository } from "../repository/AdmRepository.js";
import { BycriptCripto } from "../utils/bcrypt.js";
import { JwtToken } from "../utils/Jwt.js";
import { login } from "../middleware/admValidator.js";
export class AdmService {
  static async login(body: {
    cnpj: string;
    password: string;
  }): Promise<string> {
    try {
      const admRegister = await AdmRepository.getUnique(body.cnpj);
      if (!admRegister) {
        throw new AllError("usuário não encontrado no sistema", 400);
      }
      if (!(admRegister instanceof Array)) {
        const passwordEqual = BycriptCripto.comparePassword(
          body.password,
          admRegister.password
        );
        if (passwordEqual && process.env.ADM_JWT_SECRET) {
          const [clientWithPermisions] = (await AdmRepository.getUnique(
            undefined,
            admRegister.id,
            true
          )) as admClient[];

          const token = await JwtToken.getCodeToken(
            clientWithPermisions,
            process.env.ADM_JWT_SECRET,
            { expiresIn: "1h" }
          );
          return token;
        }
        throw new AllError("as senhas não se coicidem");
      }
    } catch (error) {
      throw error;
    }
    // const admRegister = await
    return "";
  }
  static async create({ cnpj, password }: login, permission: number[]) {
    try {
      const security = 10;
      const admRegister = await AdmRepository.getUnique(cnpj);
      if (admRegister) {
        throw new AllError("administrador ja cadastrado no sistema");
      }
      const senhaHash = BycriptCripto.createPassword(password, security);
      password = senhaHash;
      console.log(password);
      await AdmRepository.create({ cnpj, password }, permission);
    } catch (error) {
      throw error;
    }
  }
}
