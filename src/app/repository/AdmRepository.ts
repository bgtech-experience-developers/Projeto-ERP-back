import { InstanciaPrisma } from "../db/PrismaClient.js";

export class AdmRepository {
  static async getUnique(cnpj?: string, id?: number, query?: boolean) {
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
        return connectionDb.adm.findFirst({ where: { cnpj } });
      }
      return connectionDb.adm.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
