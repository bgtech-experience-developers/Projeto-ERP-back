import { InstanciaPrisma } from "../db/PrismaClient.js";

import { ClientCreate } from "../controller/client.js";
import { Files } from "../middleware/ClientValidator.js";
import { AllError } from "../error/AllError.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { promises } from "form-data";
import { Sharp } from "../utils/sharp.js";

interface allClientes extends ClientC {}
interface allClientes extends base_solid_allclient {}

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
        const client = await tsx.client.create({data:{...cliente},select:{id:true}})
        const delivery = await tsx.address.create({data:{...endereco_entrega},select:{id:true}})
        const store = await tsx.address.create({data:{...endereco_empresa},select:{id:true}})
        const finance = await tsx.sector.create({data:{...financeiro},select:{id:true}})
        const commercial = await tsx.sector.create({data:{...comercial},select:{id:true}})
        const accounting = await tsx.sector.create({data:{...contabil},select:{id:true}})
        const owner = await tsx.sector.create({data:{...socio},select:{id:true}})
        const imagesUsers = await ApiPhpUtils(imagens, "img_profile", files);
        const Allimagens = imagesUsers.map(async (imagem) => {
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
          console.log(Allimagens)

        return { mensagem: "empresa registrada com sucesso nesse novo estilo" };
      });

      return await result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async GetuniqueClient<$Interface>(cnpj?: $Interface, id?: number) {
    try {
      console.log('passei');
      
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

  static async deleteClient() {

  }

  static async getImage(id: number) {
    try {

      const pathImages = await this.connectionDb.client.findUnique({
        where: {
          id
        },
        include: {
          image_company: {
            include: {
              image: {
                select: {
                  path: true
                }
              }
            }
          }, owner_partner: {
            include: {
              sector: {
                include: {
                  owner_partner_image: {
                    select: {
                      image: {
                        select: {
                          path: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }, commercial_contact: {
            include: {
              sector: {
                include: {
                  commercial_image: {
                    select: {
                      image: {
                        select: {
                          path: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }, financinal_contact: {
            include: {
              sector: {
                include: {
                  financial_image: {
                    select: {
                      image: {
                        select: {
                          path: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }, accounting_contact: {
            include: {
              sector: {
                include: {
                  accounting_contact_image: {
                    select: {
                      image: {
                        select: {
                          path: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      
      return pathImages;
      // console.log(pathImages?.image_company[0].image.path);
      // console.log(pathImages?.owner_partner[0].sector.owner_partner_image[0].image.path);
      // console.log(pathImages?.commercial_contact[0].sector.commercial_image[0].image.path);
      // console.log(pathImages?.accounting_contact[0].sector.accounting_contact_image[0].image.path);
      // console.log(pathImages?.financinal_contact[0].sector.financial_image[0].image.path);
 
 
 
      // const allPaths =  this.connectionDb.$transaction(async (tsx) => {
      // const commercial_contact =  await this.connectionDb.commercial_contact.findFirst({
      //   where: {
      //     clientId: id
      //   }
      // })

      // const financial_contact = await this.connectionDb.financial_contact.findFirst({
      //   where: {
      //     clientId: id
      //   }
      // })

      // const accounting_contact = await this.connectionDb.accounting_contact.findFirst({
      //   where: {
      //     clientId: id
      //   }
      // })

      // const image_company = await this.connectionDb.image_company.findFirst({
      //   where: {
      //     companyId: id
      //   }
      // })

      // const owner_partner =  await this.connectionDb.owner_partner.findFirst({
      //   where: {
      //     clientId: id
      //   }
      // })


      // const commercial_image = await this.
 

      // })


      
    } catch(error) {
      throw error
    }
  }





}
