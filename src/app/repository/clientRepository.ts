import { InstanciaPrisma } from "../db/PrismaClient.js";

import { ClientCreate } from "../controller/client.js";
import { Files } from "../middleware/ClientValidator.js";
import { AllError } from "../error/AllError.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { promises } from "form-data";
import { Sharp } from "../utils/sharp.js";
import { PrismaClient } from "@prisma/client/extension";
import { SQLAdapter } from "../db/dbAdapter.js";
type allTables =
  | "accounting_contact_image"
  | "commercial_image"
  | "owner_partner_image"
  | "financial_image"
  | "image_company";
interface allClientes extends ClientC {}
interface allClientes extends base_solid_allclient {}
type imageStorageDb = { path: string | null; id: number }[];
interface imagensIds {
  commercial: number[];
  financeiro: number[];
  socio: number[];
  contabil: number[];
}

export class ClientRepository {
  static connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão

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
    imagens: (string | null)[],
    files: Express.Multer.File[]
  ) {
    try {
      console.log(comercial);
      console.log(imagens);
      const connectionDb = InstanciaPrisma.GetConnection();

      //consumo da api do marney para armazenar as imagens
      const result = connectionDb.$transaction(async (tsx) => {
        const client = await tsx.client.create({
          data: { ...cliente },
          select: { id: true },
        });
        const delivery = await tsx.address.create({
          data: { ...endereco_entrega },
          select: { id: true },
        });
        const store = await tsx.address.create({
          data: { ...endereco_empresa },
          select: { id: true },
        });
        const finance = await tsx.sector.create({
          data: { ...financeiro },
          select: { id: true },
        });
        const commercial = await tsx.sector.create({
          data: { ...comercial },
          select: { id: true },
        });
        const accounting = await tsx.sector.create({
          data: { ...contabil },
          select: { id: true },
        });
        const owner = await tsx.sector.create({
          data: { ...socio },
          select: { id: true },
        });
        const imagesUsers = await ApiPhpUtils(imagens, "img_profile", files);
        const Allimagens = imagesUsers.map(async (imagem) => {
          console.log(imagem);
          return await tsx.imagem.create({
            data: { path: imagem ? imagem : null },
            select: { id: true },
          });
        });

        const imagensRegister = await Promise.all(Allimagens);
        console.log(imagensRegister);
        await tsx.commercial_image.create({
          data: {
            imageId: imagensRegister[2].id,
            commercial_contactId: commercial.id,
          },
        });
        await tsx.image_company.create({
          data: { imageId: imagensRegister[0].id, companyId: client.id },
        });
        await tsx.financial_image.create({
          data: {
            imageId: imagensRegister[3].id,
            financial_contactId: finance.id,
          },
        });
        await tsx.owner_partner_image.create({
          data: { imageId: imagensRegister[1].id, owner_partnerId: owner.id },
        });
        await tsx.accounting_contact_image.create({
          data: {
            imageId: imagensRegister[4].id,
            accounting_contactId: accounting.id,
          },
        });
        await tsx.delivery_address.create({
          data: { adressId: delivery.id, clientId: client.id },
        }),
          await tsx.company_address.create({
            data: { adressId: store.id, clientId: client.id },
          }),
          await tsx.commercial_contact.create({
            data: { sectorId: commercial.id, clientId: client.id },
          }),
          await tsx.financial_contact.create({
            data: { sectorId: finance.id, clientId: client.id },
          }),
          await tsx.owner_partner.create({
            data: { sectorId: owner.id, clientId: client.id },
          }),
          await tsx.accounting_contact.create({
            data: { sectorId: accounting.id, clientId: client.id },
          });
        console.log(Allimagens);

        return { mensagem: "empresa registrada com sucesso nesse novo estilo" };
      });

      return await result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async GetuniqueClient<$Interface>(
    cnpj?: $Interface,
    id?: number
  ): Promise<ClientC | getUnic | null> {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      if (cnpj) {
        const getuniqueClient = await connectionDb.client.findFirst({
          where: { cnpj },
        });
        return getuniqueClient;
      } else {
        const getUniqueClient: getUnic | null =
          await connectionDb.client.findUnique({
            where: { id },
            include: {
              financinal_contact: { select: { sectorId: true } },
              commercial_contact: { select: { sectorId: true } },
              accounting_contact: { select: { sectorId: true } },
              owner_partner: { select: { sectorId: true } },
              image_company: { include: { image: { select: { path: true } } } },
              company_address: { include: { adress: true } },
              delivery_address: {
                include: { adress: true },
              },
            },
          });

        return getUniqueClient;
      }
    } catch (error) {
      throw error;
    }
  }

  static async GetAllAddress(id: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return await connectionDb.client.findMany({
        where: { id },
        include: {
          company_address: { select: { adressId: true } },
          delivery_address: { select: { adressId: true } },
        },
      });
    } catch (error) {
      throw error;
    }
  }
  static async sector(id: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return connectionDb.sector.findUnique({ where: { id } });
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
  static async getImageAllIds(arrayId: imagensIds) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      const allImagensCommercial = await Promise.all(
        arrayId.commercial.map(async (id) => {
          return await connectionDb.commercial_image.findFirst({
            where: { commercial_contactId: id },
            select: { imageId: true },
          });
        })
      );
      const allimagensfinanceiro = await Promise.all(
        arrayId.financeiro.map(async (id) => {
          return await connectionDb.financial_image.findFirst({
            where: { financial_contactId: id },
            select: { imageId: true },
          });
        })
      );
      const allimagensSocio = await Promise.all(
        arrayId.socio.map(async (id) => {
          return await connectionDb.owner_partner_image.findFirst({
            where: { owner_partnerId: id },
            select: { imageId: true },
          });
        })
      );
      const allimagensCotabil = await Promise.all(
        arrayId.contabil.map(async (id) => {
          return await connectionDb.accounting_contact_image.findFirst({
            where: { accounting_contactId: id },
            select: { imageId: true },
          });
        })
      );
      return {
        allimagensCotabil,
        allimagensfinanceiro,
        allimagensSocio,
        allImagensCommercial,
      };
    } catch (error) {
      throw error;
    }
  }

  static async showCLients(limit: number, page: number, status: boolean) {
    try {
      const allclients: allClientes[] =
        await InstanciaPrisma.GetConnection().client.findMany({
          include: {
            owner_partner: {
              include: {
                sector: {
                  select: {
                    name: true,
                    email: true,
                    cell_phone: true,
                  },
                },
              },
            },
          },
          where: { situation: status },
          take: limit,
          skip: page,
        });

      return allclients;
    } catch (err) {
      throw err;
    }
  }

  static async showClientById(id: number) {
    try {
      return await InstanciaPrisma.GetConnection().client.findUnique({
        where: { id },
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateClient(
    body: ClientCreate,
    images: (string | null)[],
    idsSector: number[],
    paths: imageStorageDb,
    files: Express.Multer.File[]
  ) {
    const message = this.connectionDb.$transaction(async (connection) => {
      const imagesUsers = await ApiPhpUtils(images, "img_profile", files);
      paths.forEach(({ path, id }, index) => {
        if (imagesUsers[index]) {
          console.log(imagesUsers[index]);

          paths[index].path = imagesUsers[index];
          console.log(paths[index].path);
        }
      });
      await connection.client.update({
        where: { id: idsSector[0] },
        data: { ...body.cliente, situation: body.situation },
      });
      //agora vou atualizar vários registros de uma vez utilizando uma estrutura de laço de repetição
      const bodyArrya = [
        body.socio,
        body.comercial,
        body.financeiro,
        body.contabil,
      ];
      const allregisterUpd = bodyArrya.map(async (props, index) => {
        return await connection.sector.update({
          where: { id: idsSector[index + 1] },
          data: { ...props },
        });
      });
      const all = await Promise.all(allregisterUpd);

      const allimages = paths.map(async ({ path, id }) => {
        return await this.connectionDb.imagem.update({
          where: { id },
          data: { path: path ? path : null },
        });
      });
      const allImagens = await Promise.all(allimages);
      return "cliente atualizado com êxito";
    });
    return message;
  }

  static async idSector(id: number) {
    try {
      const arrayIds = this.connectionDb.$transaction(async (connection) => {
        const commercial_id_sector =
          await connection.commercial_contact.findFirst({
            where: { clientId: id },
            select: { sectorId: true },
          });
        const finance_id_sector = await connection.financial_contact.findFirst({
          where: { clientId: id },
          select: { sectorId: true },
        });
        const accounting_contact_id_sector =
          await connection.accounting_contact.findFirst({
            where: { clientId: id },
            select: { sectorId: true },
          });
        const owner_partner_id_sector =
          await connection.owner_partner.findFirst({
            where: { clientId: id },
            select: { sectorId: true },
          });
        if (
          owner_partner_id_sector &&
          finance_id_sector &&
          commercial_id_sector &&
          accounting_contact_id_sector
        ) {
          return [
            id,
            owner_partner_id_sector.sectorId,
            commercial_id_sector.sectorId,
            finance_id_sector.sectorId,
            accounting_contact_id_sector.sectorId,
          ];
        }
        return [];
      });
      return arrayIds;
    } catch (error) {
      throw error;
    }
  }
  static async Allimage(id: number) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return await connectionDb.imagem.findUnique({
        where: { id },
        select: { path: true },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getImagee(arrayIdsector: number[]) {
    try {
      const result = this.connectionDb.$transaction(async (connection) => {
        const imagepathCompany = await connection.image_company.findFirst({
          where: { companyId: arrayIdsector[0] },
          select: { imageId: true },
        });

        const imagepathOwner = await connection.owner_partner_image.findFirst({
          where: { owner_partnerId: arrayIdsector[1] },
          select: { imageId: true },
        });
        const imagePathCommercial = await connection.commercial_image.findFirst(
          {
            where: { commercial_contactId: arrayIdsector[2] },
            select: { imageId: true },
          }
        );
        const imagePathFinance = await connection.financial_image.findFirst({
          where: { financial_contactId: arrayIdsector[3] },
          select: { imageId: true },
        });
        const imagePathAccounting =
          await connection.accounting_contact_image.findFirst({
            where: { accounting_contactId: arrayIdsector[4] },
            select: { imageId: true },
          });
        if (
          imagePathCommercial &&
          imagepathCompany &&
          imagePathAccounting &&
          imagePathFinance &&
          imagepathOwner
        ) {
          const AllPathsImages = await connection.imagem.findMany({
            where: {
              id: {
                in: [
                  imagepathCompany.imageId,
                  imagepathOwner.imageId,
                  imagePathCommercial.imageId,
                  imagePathFinance.imageId,
                  imagePathAccounting.imageId,
                ],
              },
            },
            select: { path: true, id: true },
          });
          console.log(
            "todos os registros conforme os ids que foram passados é ",
            AllPathsImages
          );

          return AllPathsImages;
        }
        [false, true, false, false, false];
        return [];
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteClient(
    idClient: number,
    idsSector: number[],
    idsImagem: number[],
    idsAddress: number[],
    company_id: number
  ) {
    try {
      const result = this.connectionDb.$transaction(async (tsx) => {
        console.log("todos os ids da imagem ", idsImagem);
        await tsx.client.delete({ where: { id: idClient } });
        await tsx.imagem.delete({ where: { id: company_id } });
        await tsx.sector.deleteMany({
          where: {
            id: {
              in: idsSector.map((id) => {
                return id;
              }),
            },
          },
        });
        await tsx.address.deleteMany({
          where: {
            id: {
              in: idsAddress.map((id) => {
                return id;
              }),
            },
          },
        });
        await tsx.imagem.deleteMany({
          where: {
            id: {
              in: idsImagem.map((id) => {
                return id;
              }),
            },
          },
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static async getImage(id: number) {
    try {
      const pathImages = await this.connectionDb.client.findUnique({
        where: {
          id,
        },
        include: {
          image_company: {
            include: {
              image: {
                select: {
                  path: true,
                  id: true,
                },
              },
            },
          },
          owner_partner: {
            include: {
              sector: {
                include: {
                  owner_partner_image: {
                    select: {
                      image: {
                        select: {
                          path: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          commercial_contact: {
            include: {
              sector: {
                include: {
                  commercial_image: {
                    select: {
                      image: {
                        select: {
                          path: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          financinal_contact: {
            include: {
              sector: {
                include: {
                  financial_image: {
                    select: {
                      image: {
                        select: {
                          path: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          accounting_contact: {
            include: {
              sector: {
                include: {
                  accounting_contact_image: {
                    select: {
                      image: {
                        select: {
                          path: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return pathImages;
    } catch (error) {
      throw error;
    }
  }
  static async filterClient({
    branch_activity,
    fantasy_name,
    email,
    name,
    phone,
    situation,
  }: filtragem) {
    try {
      const executeQuery = new SQLAdapter(this.connectionDb);
      const result = await this.connectionDb
        .$queryRaw`SELECT erp.Client.*,erp.sector.*,erp.owner_partner.* FROM erp.Client
        LEFT JOIN erp.owner_partner ON erp.Client.id = erp.owner_partner.clientId
        LEFT JOIN erp.sector ON erp.owner_partner.sectorId = erp.sector.id
        WHERE (erp.Client.branch_activity LIKE ${branch_activity.contains} OR erp.Client.fantasy_name LIKE ${fantasy_name.contains} OR (erp.Client.id) NOT IN (SELECT t1.clientId FROM erp.owner_partner AS t1 LEFT JOIN erp.sector AS j2 ON
      (j2.id) = (t1.sectorId) LEFT JOIN erp.sector AS j3 ON (j3.id) = (t1.sectorId) LEFT JOIN erp.sector AS j4 ON (j4.id) = (t1.sectorId) WHERE ((NOT ((j2.email LIKE ${email.contains} AND (j2.id IS NOT NULL)) OR (j3.name LIKE ${name.contains} AND (j3.id IS NOT NULL)) OR (j4.cell_phone LIKE ${phone.contains} AND (j4.id IS NOT NULL)))) AND t1.clientId IS NOT NULL))) AND erp.Client.situation LIKE ${situation} `;
      // const result = executeQuery.executeQuery(result)

      return result;
    } catch (error) {
      throw error;
    }
  }
}
