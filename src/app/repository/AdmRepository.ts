import { InstanciaPrisma } from "../db/PrismaClient.js";
import { login } from "../middleware/admValidator.js";

export class AdmRepository {
  static connectionDb = InstanciaPrisma.GetConnection();
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
        return connectionDb.adm.findFirst({
          where: { cnpj },
        });
      }
      return connectionDb.adm.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async create(body: login, permissions: number[]) {
    try {
      const result = await this.connectionDb.$transaction(async (tsx) => {
        //ideia da
        const adm = await tsx.adm.create({
          data: { ...body },
        });
        const role = await tsx.roleAdm.createMany({
          data: permissions.map((id) => {
            return { adm_id: adm.id, role_id: id };
          }),
        });
        return "administrador cadastrado com sucesso";
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
  static async update() {}

  static async getAll(skip: number): Promise<adm[]>{

    try {
      const connectionDb = InstanciaPrisma.GetConnection();

      return await connectionDb.adm.findMany({
        take: 2,
        skip,
        select: {
          cnpj: true,
        }
      });
    }
      catch(error) {
        throw error;
      }
  }
}
