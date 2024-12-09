import { ClientCreate } from "../controller/client.js";
import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Files } from "../middleware/ClientValidator.js";
import { DeleteResourcesCloud, UploadCloudnary } from "../utils/cloudinary.js";
import { Sharp } from "../utils/sharp.js";
import { ApiPhp, deleteApiPhp, deleteUpload } from "../middleware/ApiPhp.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { all } from "axios";

export class ClientService {
  static async CreateClientService(
    body: ClientCreate,
    image: Express.Multer.File[],
    order: boolean[]
  ): Promise<{ mensagem: string }> {
    try {
      const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
      if (!cliente) {
        const imagens = Sharp.allImagens(image, order);
        return ClientRepository.createCliente(body, imagens, image); // ja to enviando de forma aliada o caminho da imagens e os camops null de qum não enviou
      }
      await Sharp.removeImagens(image);
      throw new AllError("cliente ja cadastrado no sistema");
    } catch (error) {
      throw error;
    }
  }

  static async getAllAddress(id: number) {
    try {
      if (Number(id) && id) {
        const client = await ClientRepository.GetuniqueClient(null, id);
        if (client) {
          return await ClientRepository.GetAllAddress(client.id);
        }
        throw new AllError("client não existe", 400);
      }

      throw new AllError("Argumentos inválidos, tipo inesperado.");
    } catch (error) {
      throw error;
    }
  }

  static async showClints() {
    try {
      const allClints = await ClientRepository.showCLients();

      const newArray = allClints.map(

        ({ id, branch_activity, situation, fantasy_name, owner_partner }) => {

   
          return {
            id,
            branch_activity,
            situation,
            fantasy_name,
            name: [
              ...owner_partner.map(({ sector }) => {
                return sector.name;
              }),
            ],
            email: [
              ...owner_partner.map(({ sector }) => {
                return sector.email;
              }),
            ],
            telefone: [
              ...owner_partner.map(({ sector }) => {
                return sector.cell_phone;
              }),
            ],
          };
        }
      );
      return newArray;
    } catch (error) {
      throw error;
    }
  }

  static async showClientById(id: string) {
    try {
      if (Number(id)) {
        const idClient = Number(id);
        const showOneClient = (await ClientRepository.GetuniqueClient(
          null,
          idClient
        )) as getUnic;
        console.log(showOneClient);
        if (!showOneClient) {
          throw new AllError(
            "Usuário não cadastrado/encontrado no sistema",
            404
          );
        }
        const allIdsFinancial = showOneClient.financinal_contact.map(
          ({ sectorId }) => {
            return sectorId;
          }
        );
        const allIdsCommercial = showOneClient.commercial_contact.map(
          ({ sectorId }) => {
            return sectorId;
          }
        );
        const allIdsOwern = showOneClient.owner_partner.map(({ sectorId }) => {
          return sectorId;
        });
        const allIdsaccounting_contact = showOneClient.accounting_contact.map(
          ({ sectorId }) => {
            return sectorId;
          }
        );
        const {
          allImagensCommercial,
          allimagensCotabil,
          allimagensSocio,
          allimagensfinanceiro,
        } = await ClientRepository.getImageAllIds({
          commercial: [...allIdsCommercial],
          contabil: [...allIdsaccounting_contact],
          financeiro: [...allIdsFinancial],
          socio: [...allIdsOwern],
        });
        const pathsCommercial = await Promise.all(
          allImagensCommercial.map(async (imagem) => {
            if (imagem?.imageId) {
              return await ClientRepository.Allimage(imagem.imageId);
            }
            return null;
          })
        );
        console.log(
          "esses são todos os caminhos do comercial ",
          pathsCommercial
        );
        const pathsFinance = await Promise.all(
          allimagensfinanceiro.map(async (imagem) => {
            if (imagem?.imageId) {
              return await ClientRepository.Allimage(imagem.imageId);
            }
          })
        );
        const pathsOwern = await Promise.all(
          allimagensSocio.map(async (imagem) => {
            if (imagem?.imageId) {
              return await ClientRepository.Allimage(imagem.imageId);
            }
          })
        );
        const pathsAccouting = await Promise.all(
          allimagensCotabil.map(async (imagem) => {
            if (imagem?.imageId) {
              return await ClientRepository.Allimage(imagem.imageId);
            }
          })
        );
        const commercialUser = await Promise.all(
          showOneClient.commercial_contact.map(async ({ sectorId }) => {
            return await ClientRepository.sector(sectorId);
          })
        );
        const accountingUser = await Promise.all(
          showOneClient.accounting_contact.map(async ({ sectorId }) => {
            return await ClientRepository.sector(sectorId);
          })
        );
        const ownerUser = await Promise.all(
          showOneClient.owner_partner.map(async ({ sectorId }) => {
            return await ClientRepository.sector(sectorId);
          })
        );
        const financeUser = await Promise.all(
          showOneClient.financinal_contact.map(async ({ sectorId }) => {
            return await ClientRepository.sector(sectorId);
          })
        );
        return {
          ...showOneClient,
          
          image_company: showOneClient.image_company[0].image.path,
          financinal_contact: financeUser.map((body, index) => {
            const image = pathsFinance[index]?.path
              ? pathsFinance[index].path
              : null;
            return { ...body, image };
          }),
          commercial_contact: commercialUser.map((body, index) => {
            const image = pathsCommercial[index]?.path
              ? pathsCommercial[index].path
              : null;
            return { ...body, image };
          }),
          accounting_contact: accountingUser.map((body, index) => {
            const image = pathsAccouting[index]?.path
              ? pathsAccouting[index].path
              : null;
            return { ...body, image };
          }),
          owner_partner: ownerUser.map((body, index) => {
            const image = pathsOwern[index]?.path
              ? pathsOwern[index].path
              : null;
            return { ...body, index };
          }),
          company_address: showOneClient.company_address.map(({adress}) => {
            return adress;
          }),
          delivery_address: showOneClient.delivery_address.map(({adress}) => {
            return adress;
          })
          
        };
      }
      throw new AllError("parametro não aceito, envie somente números");
    } catch (error) {
      throw error;
    }
  }

  static async updateClient(
    body: ClientCreate,
    order: boolean[],
    files: Express.Multer.File[]
  ) {
    try {
      const client = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
      if (!client) {
        throw new AllError(
          "não é possivel atualizar o cliente pois não existe registro no sistema"
        );
      }
      const allIdsSector: number[] = await ClientRepository.idSector(client.id);
      if (allIdsSector.length === 0) {
        throw new AllError(
          "não existe nenhum registro relacionado com a empresa"
        );
      }
      console.log(allIdsSector);
      const allPaths = await ClientRepository.getImagee(allIdsSector);
      console.log(allPaths);
      // nesse caso eu ja tenho as imagens que foram armazenadas no banco de dados
      const deletePathsFilter = allPaths.filter(({ path }, index) => {
        if (order[index]) {
          return path ? path : false;
        }
      });

      if (deletePathsFilter.length != 0) {
        const deletePaths = deletePathsFilter.map(({ path }) => {
          const paths = path
            ? path.replace("https://bgtech.com.br/erp/assets/", "")
            : null;
          return paths;
        });

        await deleteUpload([...deletePaths]);
      }
      const imagens = Sharp.allImagens(files, order);

      return await ClientRepository.updateClient(
        body,
        imagens,
        allIdsSector,
        allPaths,
        files
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteClient(param: string | number) {
    try {
      const paths = [];
      if (Number(param) && param) {
        const company = await ClientRepository.GetuniqueClient(
          undefined,
          Number(param)
        );
        // console.log(company);1

        if (!company) {
          throw new AllError("Cliente/Empresa não cadastrada no sistema!", 404);
        }

        const pathImages = await ClientRepository.getImage(Number(param));
        // console.log(pathImages);

        paths.push(pathImages?.image_company[0].image.path);
        paths.push(
          pathImages?.owner_partner[0].sector.owner_partner_image[0].image.path
        );
        paths.push(
          pathImages?.commercial_contact[0].sector.commercial_image[0].image
            .path
        );
        paths.push(
          pathImages?.accounting_contact[0].sector.accounting_contact_image[0]
            .image.path
        );
        paths.push(
          pathImages?.financinal_contact[0].sector.financial_image[0].image.path
        );

        const pathsAll = paths.filter((path) => path != null || undefined);
        const newPath = pathsAll.map((path) => {
          const paths = path?.replace("https://bgtech.com.br/erp/assets/", "");
          return paths ? paths : null;
        });
        console.log(newPath);

        deleteApiPhp(newPath);

        const idSector = await ClientRepository.idSector(company.id);

        const deleteClient = await ClientRepository.deleteClient(Number(param));
        console.log(deleteClient);

        return deleteClient;
      }

      throw new AllError("Argumentos inválidos, tipo inesperado.");
    } catch (error) {
      throw error;
    }
  }
}