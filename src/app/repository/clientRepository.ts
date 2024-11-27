import { InstanciaPrisma } from "../db/PrismaClient.js";

import { ClientCreate } from "../controller/client.js";
import { Files } from "../middleware/ClientValidator.js";
import { AllError } from "../error/AllError.js";
import { ApiPhp } from "../middleware/ApiPhp.js";
interface allClientes extends ClientC {}
interface allClientes extends base_solid_allclient {}

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
    imagens: (string | null)[]
  ) {
    try {
      console.log(imagens);
      const connectionDb = InstanciaPrisma.GetConnection();

      // const create = imagens.map((imagem) => {
      //   return tsx.imagem.create({ data: {} });
      // });
      const [
        client,
        delivery,
        store,
        finance,
        commercial,
        accounting,
        owner,
        image_company,
        image_socio,
        image_commercial_contact,
        image_financial,
        image_contabil,
      ] = await connectionDb.$transaction([
        connectionDb.client.create({
          data: {
            ...cliente,
          },
          select: { id: true },
        }),
        connectionDb.address.create({ data: { ...endereco_empresa } }),
        connectionDb.address.create({ data: { ...endereco_entrega } }),
        connectionDb.sector.create({
          data: {
            ...financeiro,
          },
        }),
        connectionDb.sector.create({
          data: {
            ...comercial,
          },
        }),
        connectionDb.sector.create({
          data: {
            ...contabil,
          },
        }),
        connectionDb.sector.create({
          data: {
            ...socio,
          },
        }),
        connectionDb.imagem.create({
          data: { path: imagens[0] ? imagens[0] : null },
        }),
        connectionDb.imagem.create({
          data: { path: imagens[1] ? imagens[1] : null },
        }),
        connectionDb.imagem.create({
          data: { path: imagens[2] ? imagens[2] : null },
        }),
        connectionDb.imagem.create({
          data: { path: imagens[3] ? imagens[3] : null },
        }),
        connectionDb.imagem.create({
          data: { path: imagens[4] ? imagens[4] : null },
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
        connectionDb.image_company.create({
          data: { imageId: image_company.id, companyId: client.id },
        }),
        connectionDb.financial_image.create({
          data: {
            imageId: image_financial.id,
            financial_contactId: finance.id,
          },
        }),
        connectionDb.commercial_image.create({
          data: {
            imageId: image_commercial_contact.id,
            commercial_contactId: commercial.id,
          },
        }),
        connectionDb.owner_partner_image.create({
          data: { imageId: image_socio.id, owner_partnerId: owner.id },
        }),
        connectionDb.accounting_contact_image.create({
          data: {
            imageId: image_contabil.id,
            accounting_contactId: accounting.id,
          },
        }),
      ]);

      return { mensagem: "empresa registrada com sucesso" };
    } catch (error) {
      console.log(error);
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
  static async showCLients() {
    try {
      const allclients: allClientes[] =
        await InstanciaPrisma.GetConnection().client.findMany({
          include: {
            owner_partner: {
              include: {
                sector: {
                  select: { name: true, email: true, cell_phone: true },
                },
              },
            },
          },
        });

      return allclients;
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
