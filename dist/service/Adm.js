import { AllError } from "../error/AllError.js";
import { AdmRepository } from "../repository/AdmRepository.js";
import { BycriptCripto } from "../utils/bcrypt.js";
import { JwtToken } from "../utils/Jwt.js";
export class AdmService {
    static async login(body) {
        try {
            const admRegister = await AdmRepository.getUnique(body.cnpj);
            if (!admRegister) {
                throw new AllError("usuário não encontrado no sistema", 400);
            }
            if (!(admRegister instanceof Array)) {
                const passwordEqual = BycriptCripto.comparePassword(body.password, admRegister.password);
                console.log(passwordEqual);
                if (passwordEqual && process.env.ADM_JWT_SECRET) {
                    console.log(process.env.ADM_JWT_SECRET);
                    const [clientWithPermisions] = (await AdmRepository.getUnique(undefined, admRegister.id, true));
                    const token = await JwtToken.getCodeToken(clientWithPermisions, process.env.ADM_JWT_SECRET, { expiresIn: "1h" });
                    return token;
                }
                throw new AllError("as senhas não se coicidem");
            }
        }
        catch (error) {
            throw error;
        }
        // const admRegister = await
        return "";
    }
    static async create({ cnpj, password }, permission) {
        try {
            const security = 10;
            const admRegister = await AdmRepository.getUnique(cnpj);
            console.log(admRegister);
            if (admRegister) {
                throw new AllError("administrador ja cadastrado no sistema");
            }
            const senhaHash = BycriptCripto.createPassword(password, security);
            console.log(password + "aui");
            password = senhaHash;
            return await AdmRepository.create({ cnpj, password }, permission);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAll(query) {
        try {
            return (await AdmRepository.getAll(Number(query.page)));
        }
        catch (error) {
            throw error;
        }
    }
    static async delete(query) {
        try {
            // Verifica se true e também verifica se o Number, retorna true, pois se for diferente de numeros ele retorna false
            if (query.id && Number(query.id)) {
                const id = Number(query.id);
                const adm = await AdmRepository.getUnique(undefined, id);
                console.log(adm);
                if (!adm) {
                    throw new AllError("Administrator não encontrado no sistema", 404);
                }
                return await AdmRepository.delete(id);
            }
            throw new AllError("QueryString inválida/numeros primitivos, ou seja ser 1234, e não 'dbwdu' ", 400);
        }
        catch (error) {
            throw error;
        }
    }
}
