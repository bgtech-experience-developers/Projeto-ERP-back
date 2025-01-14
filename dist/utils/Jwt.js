import jwt from "jsonwebtoken";
import { AllError } from "../error/AllError.js";
export class JwtToken {
    static async getCodeToken(user, secreteKey, time) {
        try {
            const secret = secreteKey === "adm"
                ? process.env.ADM_JWT_SECRET
                : process.env.ADM_JWT_REGULAR;
            if (secreteKey === "Regular") {
                const token = jwt.sign({ ...user, role: "Regular" }, secret, time);
                const { payload } = jwt.verify(token, secret, { complete: true });
                return { token, payload };
            }
            else {
                const token = jwt.sign({
                    id: user.id,
                    cnpj: user.cnpj,
                    permission: [...user.permission],
                    role: "adm",
                }, secret, time);
                const { payload } = jwt.verify(token, secret, { complete: true });
                return { token, payload };
            }
        }
        catch (error) {
            throw error;
        }
    }
    static async validToken(token, secret) {
        try {
            jwt.verify(token, secret, (error) => {
                if (error) {
                    throw new AllError("token inválido");
                }
                return "token válido ainda";
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async tokenPayload(token, secretKey) {
        try {
            await this.validToken(token, secretKey);
            const { payload } = jwt.verify(token, secretKey, { complete: true });
            return payload;
        }
        catch (error) {
            throw error;
        }
    }
    static TokenEmail(payload, secretKey) {
        return jwt.sign(payload, secretKey, { expiresIn: "1h" });
    }
    static async RefreshToken(payload, acess) {
        try {
            const secretKeyAdm = process.env.ADM_JWT_SECRET;
            if (acess === "adm" && secretKeyAdm) {
                return jwt.sign({
                    id: payload.id,
                    cnpj: payload.cnpj,
                    permission: [...payload.permission],
                    role: acess,
                }, secretKeyAdm, {
                    expiresIn: "7d",
                });
            }
            else {
                const SecretKeyRegular = process.env.REGULAR_JWT_SECRET || "senharegular";
                return jwt.sign({ ...payload, role: "Regular" }, SecretKeyRegular, {
                    expiresIn: "1d",
                });
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static getTokenApi(payload, secretKey, time) {
        try {
            const secret = secretKey === "api" ? process.env.API_PHP_SECRET : null;
            if (!secret) {
                throw new AllError("a chave secreta para assinatura do token para api não foi fornecida");
            }
            return jwt.sign({ ...payload }, secret, time);
        }
        catch (error) {
            throw error;
        }
    }
}
