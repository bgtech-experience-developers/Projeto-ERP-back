import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Sharp } from "../utils/sharp.js";
import { deleteApiPhp, deleteUpload } from "../middleware/ApiPhp.js";
import { filterquery } from "../utils/filterClient.js";
export class ClientService {
    static async CreateClientService(body, image, order) {
        try {
            const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
            if (!cliente) {
                const imagens = Sharp.allImagens(image, order);
                return ClientRepository.createCliente(body, imagens, image); // ja to enviando de forma aliada o caminho da imagens e os camops null de qum não enviou
            }
            await Sharp.removeImagens(image);
            throw new AllError("cliente ja cadastrado no sistema");
        }
        catch (error) {
            throw error;
        }
    }
    static async getAllAddress(id) {
        try {
            if (Number(id) && id) {
                const client = await ClientRepository.GetuniqueClient(null, id);
                if (client) {
                    return await ClientRepository.GetAllAddress(client.id);
                }
                throw new AllError("client não existe", 400);
            }
            throw new AllError("Argumentos inválidos, tipo inesperado.");
        }
        catch (error) {
            throw error;
        }
    }
    static async showClints(limit, page, status) {
        try {
            const allClints = await ClientRepository.showCLients(limit, page, status);
            const newArray = allClints.map(({ id, branch_activity, situation, fantasy_name, owner_partner }) => {
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
            });
            return newArray;
        }
        catch (error) {
            throw error;
        }
    }
    static async showClientById(id) {
        try {
            if (Number(id)) {
                const idClient = Number(id);
                const showOneClient = (await ClientRepository.GetuniqueClient(null, idClient));
                console.log(showOneClient);
                if (!showOneClient) {
                    throw new AllError("Usuário não cadastrado/encontrado no sistema", 404);
                }
                const allIdsFinancial = showOneClient.financinal_contact.map(({ sectorId }) => {
                    return sectorId;
                });
                const allIdsCommercial = showOneClient.commercial_contact.map(({ sectorId }) => {
                    return sectorId;
                });
                const allIdsOwern = showOneClient.owner_partner.map(({ sectorId }) => {
                    return sectorId;
                });
                const allIdsaccounting_contact = showOneClient.accounting_contact.map(({ sectorId }) => {
                    return sectorId;
                });
                const { allImagensCommercial, allimagensCotabil, allimagensSocio, allimagensfinanceiro, } = await ClientRepository.getImageAllIds({
                    commercial: [...allIdsCommercial],
                    contabil: [...allIdsaccounting_contact],
                    financeiro: [...allIdsFinancial],
                    socio: [...allIdsOwern],
                });
                const pathsCommercial = await Promise.all(allImagensCommercial.map(async (imagem) => {
                    if (imagem?.imageId) {
                        return await ClientRepository.Allimage(imagem.imageId);
                    }
                    return null;
                }));
                console.log("esses são todos os caminhos do comercial ", pathsCommercial);
                const pathsFinance = await Promise.all(allimagensfinanceiro.map(async (imagem) => {
                    if (imagem?.imageId) {
                        return await ClientRepository.Allimage(imagem.imageId);
                    }
                }));
                const pathsOwern = await Promise.all(allimagensSocio.map(async (imagem) => {
                    if (imagem?.imageId) {
                        return await ClientRepository.Allimage(imagem.imageId);
                    }
                }));
                const pathsAccouting = await Promise.all(allimagensCotabil.map(async (imagem) => {
                    if (imagem?.imageId) {
                        return await ClientRepository.Allimage(imagem.imageId);
                    }
                }));
                const commercialUser = await Promise.all(showOneClient.commercial_contact.map(async ({ sectorId }) => {
                    return await ClientRepository.sector(sectorId);
                }));
                const accountingUser = await Promise.all(showOneClient.accounting_contact.map(async ({ sectorId }) => {
                    return await ClientRepository.sector(sectorId);
                }));
                const ownerUser = await Promise.all(showOneClient.owner_partner.map(async ({ sectorId }) => {
                    return await ClientRepository.sector(sectorId);
                }));
                const financeUser = await Promise.all(showOneClient.financinal_contact.map(async ({ sectorId }) => {
                    return await ClientRepository.sector(sectorId);
                }));
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
                        return { ...body, image };
                    }),
                    company_address: showOneClient.company_address.map(({ adress }) => {
                        return adress;
                    }),
                    delivery_address: showOneClient.delivery_address.map(({ adress }) => {
                        return adress;
                    }),
                };
            }
            throw new AllError("parametro não aceito, envie somente números");
        }
        catch (error) {
            throw error;
        }
    }
    static async updateClient(body, order, files) {
        try {
            const client = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
            if (!client) {
                throw new AllError("não é possivel atualizar o cliente pois não existe registro no sistema");
            }
            const allIdsSector = await ClientRepository.idSector(client.id);
            if (allIdsSector.length === 0) {
                throw new AllError("não existe nenhum registro relacionado com a empresa");
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
            return await ClientRepository.updateClient(body, imagens, allIdsSector, allPaths, files);
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteClient(param) {
        try {
            const paths = [];
            if (Number(param) && param) {
                const company = (await ClientRepository.GetuniqueClient(undefined, Number(param)));
                // console.log(company);1
                if (!company) {
                    throw new AllError("Cliente/Empresa não cadastrada no sistema!", 404);
                }
                const allids = await ClientRepository.GetAllAddress(company.id);
                const add = [
                    "company_address",
                    "delivery_address",
                ];
                const allIdsAddress = [];
                let controleArray = 0;
                allids.forEach((props, index) => {
                    console.log(props);
                    if (add["0"] in props && add["1"] in props) {
                        console.log("ola mundo");
                        const value = props[add["0"]][index].adressId;
                        const value2 = props[add["1"]][index].adressId;
                        allIdsAddress[controleArray] = value;
                        allIdsAddress[controleArray + 1] = value2;
                    }
                    controleArray += 2;
                    console.log(allIdsAddress);
                });
                const pathImages = await ClientRepository.getImage(Number(param));
                const props = [
                    "accounting_contact",
                    "financinal_contact",
                    "commercial_contact",
                    "owner_partner",
                ];
                const imagem = "owner_partner_image";
                const allIdsSector = [];
                for (let i = 0; i < props.length; i++) {
                    if (pathImages && pathImages[props[i]] instanceof Array) {
                        const [accouting, financial, commercial, owner_partner] = props;
                        allIdsSector.push(pathImages[props[i]][0].sectorId);
                    }
                }
                company.company_address[0].adress;
                company.delivery_address.map((value, index) => { });
                paths.push(pathImages?.image_company[0].image.path);
                paths.push(pathImages?.owner_partner[0].sector.owner_partner_image[0].image.path);
                paths.push(pathImages?.commercial_contact[0].sector.commercial_image[0].image
                    .path);
                paths.push(pathImages?.accounting_contact[0].sector.accounting_contact_image[0]
                    .image.path);
                paths.push(pathImages?.financinal_contact[0].sector.financial_image[0].image.path);
                const pathsAll = paths.filter((path) => path != null || undefined);
                const newPath = pathsAll.map((path) => {
                    const paths = path?.replace("https://bgtech.com.br/erp/assets/", "");
                    return paths ? paths : null;
                });
                deleteApiPhp(newPath);
                const idSector = await ClientRepository.idSector(company.id);
                const allIdsImagem = pathImages?.owner_partner.map(({ sector }, index) => {
                    return sector.owner_partner_image[index].image.id;
                });
                const allidsImagemCommercial = pathImages?.commercial_contact.map(({ sector }, index) => {
                    return sector.commercial_image[index].image.id;
                });
                const allidsFinance = pathImages?.financinal_contact.map(({ sector }, index) => {
                    return sector.financial_image[index].image.id;
                });
                const allIdsaccounting_contact = pathImages?.accounting_contact.map(({ sector }, index) => {
                    return sector.accounting_contact_image[index].image.id;
                });
                const deleteClient = await ClientRepository.deleteClient(Number(param), allIdsSector, [
                    ...allIdsaccounting_contact,
                    ...allidsFinance,
                    ...allidsImagemCommercial,
                    ...allIdsImagem,
                ], allIdsAddress, pathImages?.image_company[0].imageId);
                return deleteClient;
            }
            throw new AllError("Argumentos inválidos, tipo inesperado.");
        }
        catch (error) {
            throw error;
        }
    }
    static async filterCLient(status, value) {
        try {
            const queryFilter = await filterquery(value, status);
            const clients = await ClientRepository.filterClient(queryFilter);
            return clients;
        }
        catch (error) {
            throw error;
        }
    }
}
