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
                    const permission = clientWithPermisions.role_adm?.map(({ role }) => {
                        return role.role_name;
                    });
                    const payloadAdm = {
                        permission,
                        id: clientWithPermisions.id,
                        cnpj: clientWithPermisions.cnpj,
                    };
                    const { token, payload } = await JwtToken.getCodeToken(payloadAdm, "adm", { expiresIn: "15min" });
                    const { role } = payload;
                    const refreshToken = await JwtToken.RefreshToken(payload, role);
                    return { token, refreshToken };
                }
                throw new AllError("dados incorretos");
            }
            throw new AllError("erro interno");
        }
        catch (error) {
            throw error;
        }
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
            password = senhaHash;
            return await AdmRepository.create({ cnpj, password }, permission);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        // const admRegister = await
    }
    static async getAll(query) {
        try {
            return await AdmRepository.getAll(Number(query.page));
        }
        catch (error) {
            throw error;
        }
    }
}
