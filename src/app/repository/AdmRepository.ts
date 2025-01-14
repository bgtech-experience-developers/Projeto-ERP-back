import { triggerAsyncId } from "node:async_hooks";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { login } from "../middleware/admValidator.js";

export class AdmRepository {
  static connectionDb = InstanciaPrisma.GetConnection();
  // async getUnique(cnpj:string):Promise<adm>
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
  static async storageTemporaryToken(
    token: string,
    idUser: number,
    code: string
  ) {
    try {
      console.log(idUser);
      return await this.connectionDb.$transaction(async (tsx) => {
        await tsx.tempory_token.create({
          data: { adm_id: idUser, token, code },
        });
        return "email enviado com sucesso e token armazenado com sucesso";
      });
    } catch (error) {
      throw error;
    }
  }
  static async getUniqueByEmail(email: string) {
    try {
      return await this.connectionDb.emails.findFirst({
        where: { email },
        select: { adm_id: true },
      });
    } catch (error) {
      throw error;
    }
  }
  static async resetPassword(IdUser: number, newPassword: string) {
    try {
      const message = this.connectionDb.$transaction(async (tsx) => {
        await tsx.tempory_token.deleteMany({ where: { adm_id: IdUser } });
        await tsx.adm.update({
          where: { id: IdUser },
          data: { password: newPassword },
        });
        return "restauração de senha com êxito";
      });
      return message;
    } catch (error) {
      throw error;
    }
  }
  static async getTokenTemporary(code: string, idUser: number) {
    try {
      const tokenUser = await this.connectionDb.$transaction(async (tsx) => {
        return tsx.$queryRaw`SELECT t.token FROM erp.tempory_token t WHERE t.adm_id LIKE ${idUser} AND t.code LIKE ${code}`;
      });
      console.log(tokenUser);
      return tokenUser;
    } catch (error) {
      throw error;
    }
  }
  static async create(body: login, permissions: number[]) {
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
    } catch (err) {
      throw err;
    }
  }
  static async update() {}

  static async getAll(skip: number): Promise<adm[]> {
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
    } catch (error) {
      throw error;
    }
  }
}
