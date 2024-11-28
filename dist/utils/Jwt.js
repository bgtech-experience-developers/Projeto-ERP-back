import jwt from "jsonwebtoken";
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
                    role: 'adm',
                }, secret, time);
                const { payload } = jwt.verify(token, secret, { complete: true });
                return { token, payload };
            }
        }
        catch (error) {
            throw error;
        }
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
}
