import { AllError } from "../../../error/AllError.js";
import ;
import { BycriptCripto } from "../utils/bcrypt.js";
export class AdmService {
    static async login(body) {
        try {
            const admRegister = await AdmRepository.getUnique(body.cnpj);
            if (!admRegister) {
                throw new AllError("usuário não encontrado no sistema", 400);
            }
            const passwordEqual = BycriptCripto.comparePassword(body.password, admRegister.password);
            if (passwordEqual) {
            }
            throw new AllError("as senhas não se correspondem");
        }
        catch (error) {
            throw error;
        }
        // const admRegister = await
        return "";
    }
}
