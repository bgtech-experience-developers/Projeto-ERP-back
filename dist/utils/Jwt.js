import jwt from "jsonwebtoken";
export class JwtToken {
    static async getCodeToken(user, secreteKey, time) {
        try {
            if (user.client) {
                return jwt.sign(user, secreteKey, time);
            }
            else {
                const permissionss = user.role_adm?.map(({ role }) => {
                    return role.role_name;
                });
                return jwt.sign({
                    id: user.id,
                    cnpj: user.cnpj,
                    permissions: permissionss ? permissionss : [],
                }, secreteKey, time);
            }
        }
        catch (error) {
            throw error;
        }
    }
}
