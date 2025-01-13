import { InstanciaPrisma } from "../db/PrismaClient.js";
export class AdmRepository {
    static connectionDb = InstanciaPrisma.GetConnection();
    // async getUnique(cnpj:string):Promise<adm>
    static async getUnique(cnpj, id, query) {
        try {
            const connectionDb = InstanciaPrisma.GetConnection();
            if (query && id) {
                return await connectionDb.adm.findMany({
                    where: { id },
                    include: {
                        role_adm: { select: { role: { select: { role_name: true } } } },
                    },
                });
            }
            if (cnpj) {
                return connectionDb.adm.findFirst({
                    where: { cnpj },
                });
            }
            return connectionDb.adm.findUnique({
                where: { id },
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getUniqueByEmail(email) {
        try {
            return await this.connectionDb.emails.findFirst({ where: { email } });
        }
        catch (error) {
            throw error;
        }
    }
    static async create(body, permissions) {
        try {
            const result = await this.connectionDb.$transaction(async (tsx) => {
                const adm = await tsx.adm.create({
                    data: { ...body },
                });
                const role = await tsx.roleadm.createMany({
                    data: permissions.map((id) => {
                        return { adm_id: adm.id, role_id: id };
                    }),
                });
                return "administrador cadastrado com sucesso";
            });
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    static async update() { }
    static async getAll(skip) {
        try {
            const connectionDb = InstanciaPrisma.GetConnection();
            return await connectionDb.adm.findMany({
                take: 10,
                skip,
                select: {
                    id: true,
                    cnpj: true,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
}
