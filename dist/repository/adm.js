import { InstanciaPrisma } from "../db/PrismaClient.js";
export class AdmRepository {
    static getUnique(cnpj, id) {
        try {
            const connectionDb = InstanciaPrisma.GetConnection();
            if (cnpj) {
                return connectionDb.adm.findFirst({ where: { cnpj } });
            }
            return connectionDb.adm.findUnique({ where: { id } });
        }
        catch (error) {
            throw error;
        }
    }
}
