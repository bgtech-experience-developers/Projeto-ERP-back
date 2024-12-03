import { InstanciaPrisma } from "../db/PrismaClient.js";
import { AllError } from "../error/AllError.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
export class ClientRepository {
    static connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão
    static async createCliente({ cliente, comercial, financeiro, contabil, socio, endereco_empresa, endereco_entrega, }, imagens, files) {
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
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async GetuniqueClient(cnpj, id) {
        try {
            console.log('passei');
            const connectionDb = InstanciaPrisma.GetConnection();
            if (cnpj) {
                return await connectionDb.client.findFirst({ where: { cnpj } });
            }
            return await connectionDb.client.findUnique({ where: { id } });
        }
        catch (error) {
            throw new AllError("servidor fora do ar");
        }
    }
    static async GetAllAddress(id) {
        try {
            const connectionDb = InstanciaPrisma.GetConnection();
            return await connectionDb.client.findMany({
                where: { id },
                include: {
                    company_address: { select: { client: { select: { cnpj: true } } } },
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async showCLients() {
        try {
            const allclients = await InstanciaPrisma.GetConnection().client.findMany({
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
        }
        catch (err) {
            throw err;
        }
    }
    async showClientById(id) {
        try {
            return await InstanciaPrisma.GetConnection().client.findUnique({
                where: { id: id },
            });
        }
        catch (err) {
            throw err;
        }
    }
    static async updateClient(body, images, idsSector, paths, files) {
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
    static async idSector(id) {
        try {
            const arrayIds = this.connectionDb.$transaction(async (connection) => {
                const commercial_id_sector = await connection.commercial_contact.findFirst({
                    where: { clientId: id },
                    select: { sectorId: true },
                });
                const finance_id_sector = await connection.financial_contact.findFirst({
                    where: { clientId: id },
                    select: { sectorId: true },
                });
                const accounting_contact_id_sector = await connection.accounting_contact.findFirst({
                    where: { clientId: id },
                    select: { sectorId: true },
                });
                const owner_partner_id_sector = await connection.owner_partner.findFirst({
                    where: { clientId: id },
                    select: { sectorId: true },
                });
                if (owner_partner_id_sector &&
                    finance_id_sector &&
                    commercial_id_sector &&
                    accounting_contact_id_sector) {
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
        }
        catch (error) {
            throw error;
        }
    }
    static async getImagee(arrayIdsector) {
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
                const imagePathCommercial = await connection.commercial_image.findFirst({
                    where: { commercial_contactId: arrayIdsector[2] },
                    select: { imageId: true },
                });
                const imagePathFinance = await connection.financial_image.findFirst({
                    where: { financial_contactId: arrayIdsector[3] },
                    select: { imageId: true },
                });
                const imagePathAccounting = await connection.accounting_contact_image.findFirst({
                    where: { accounting_contactId: arrayIdsector[4] },
                    select: { imageId: true },
                });
                if (imagePathCommercial &&
                    imagepathCompany &&
                    imagePathAccounting &&
                    imagePathFinance &&
                    imagepathOwner) {
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
                    console.log("todos os registros conforme os ids que foram passados é ", AllPathsImages);
                    return AllPathsImages;
                }
                [false, true, false, false, false];
                return [];
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteClient(id) {
        try {
            return await this.connectionDb.client.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw error;
            22;
        }
    }
    static async getImage(id) {
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
            });
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
        }
        catch (error) {
            throw error;
        }
    }
}
