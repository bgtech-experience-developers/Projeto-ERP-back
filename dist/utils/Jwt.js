import jwt from "jsonwebtoken";
export class JwtToken {
    static async getCodeToken(user, secreteKey, time) {
        try {
            if (user.client) {
                const token = jwt.sign({ ...user, role: "Regular" }, secreteKey, time);
                const { payload } = jwt.verify(token, secreteKey, { complete: true });
                return { token, payload };
            }
            else {
                const permissionss = user.role_adm?.map(({ role }) => {
                    return role.role_name;
                });
                const token = jwt.sign({
                    id: user.id,
                    cnpj: user.cnpj,
                    role: "adm",
                    permission: permissionss ? permissionss : [],
                }, secreteKey, time);
                const { payload } = jwt.verify(token, secreteKey, { complete: true });
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
            return "";
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        4;
    }
}
