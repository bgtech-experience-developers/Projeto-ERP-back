import { InstanciaPrisma } from "../db/PrismaClient.js";

import { ClientCreate } from "../controller/client.js";
import { Files } from "../middleware/ClientValidator.js";
import { AllError } from "../error/AllError.js";

const connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão
export class ClientRepository {
  static async createCliente(
    {
      cliente,
      comercial,
      financeiro,
      contabil,
      socio,
      endereco_empresa,
      endereco_entrega,
    }: ClientCreate,
    imagens: ({ secure_url: string } | null)[]
  ) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      const [client, delivery, store, finance, commercial, accounting, owner] =
        await connectionDb.$transaction([
          connectionDb.client.create({
            data: {
              ...cliente,
              photo: imagens[0] ? imagens[0].secure_url : null,
            },
            select: { id: true },
          }),
          connectionDb.address.create({ data: { ...endereco_empresa } }),
          connectionDb.address.create({ data: { ...endereco_entrega } }),
          connectionDb.sector.create({
            data: {
              ...financeiro,
              photo: imagens[3] ? imagens[3].secure_url : null,
            },
          }),
          connectionDb.sector.create({
            data: {
              ...comercial,
              photo: imagens[2] ? imagens[2].secure_url : null,
            },
          }),
          connectionDb.sector.create({
            data: {
              ...contabil,
              photo: imagens[4] ? imagens[4].secure_url : null,
            },
          }),
          connectionDb.sector.create({
            data: {
              ...socio,
              photo: imagens[1] ? imagens[1].secure_url : null,
            },
          }),
        ]);
      await connectionDb.$transaction([
        connectionDb.delivery_address.create({
          data: { adressId: delivery.id, clientId: client.id },
        }),
        connectionDb.company_address.create({
          data: { adressId: store.id, clientId: client.id },
        }),
        connectionDb.commercial_contact.create({
          data: { sectorId: commercial.id, clientId: client.id },
        }),
        connectionDb.financial_contact.create({
          data: { sectorId: finance.id, clientId: client.id },
        }),
        connectionDb.owner_partner.create({
          data: { sectorId: owner.id, clientId: client.id },
        }),
        connectionDb.accounting_contact.create({
          data: { sectorId: accounting.id, clientId: client.id },
        }),
      ]);

      return { mensagem: "empresa cadastrada com sucesso" };
    } catch (error) {
      throw new AllError("não foi possivel cadastrar o usuário", 400);
    }
  }
  static async GetuniqueClient<$Interface>(cnpj: $Interface, id?: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      if (cnpj) {
        return await connectionDb.client.findFirst({ where: { cnpj } });
      }
      return await connectionDb.client.findUnique({ where: { id } });
    } catch (error) {
      throw new AllError("servidor fora do ar");
    }
  }
  static async GetAllAddress(id: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return await connectionDb.client.findMany({
        where: { id },
        include: {
          company_address: { select: { client: { select: { cnpj: true } } } },
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async sector(id: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return connectionDb.sector.findFirst({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  static async getAllresources(cnpj: string) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      const getAllresources = await connectionDb.client.findMany({
        where: { cnpj },
        include: {
          owner_partner: { select: { sectorId: true } },
          commercial_contact: { select: { sectorId: true } },
          financinal_contact: { select: { sectorId: true } },
          accounting_contact: { select: { sectorId: true } },
        },
      });
      return getAllresources;
    } catch (error) {
      throw error;
    }
  }
  async showCLients() {
    try {
      return await InstanciaPrisma.GetConnection().client.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async showClientById(id: any) {
    try {
      return await InstanciaPrisma.GetConnection().client.findUnique({
        where: { id: id },
      });
    } catch (err) {
      throw err;
    }
  }
}
