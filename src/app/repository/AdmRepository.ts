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

  static async getAll(skip: number): Promise<adm[]>{

    try {
      const connectionDb = InstanciaPrisma.GetConnection();

      return await connectionDb.adm.findMany({
        take: 10,
        skip,
        select: {
          id: true,
          cnpj: true,
        }
      });
    }
      catch(error) {
        throw error;
      }
  }
}
