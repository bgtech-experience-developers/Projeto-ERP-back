import { InstanciaPrisma } from "../db/PrismaClient.js";
import { AllError } from "../error/AllError.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
const connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão
export class ClientRepository {
    static async createCliente({ cliente, comercial, financeiro, contabil, socio, endereco_empresa, endereco_entrega, }, imagens, files) {
        try {
            console.log(comercial);
            console.log(imagens);
            const connectionDb = InstanciaPrisma.GetConnection();
            //consumo da api do marney para armazenar as imagens
            const result = connectionDb.$transaction(async (tsx) => {
                const client = await tsx.client.create({ data: { ...cliente }, select: { id: true } });
                const delivery = await tsx.address.create({ data: { ...endereco_entrega }, select: { id: true } });
                const store = await tsx.address.create({ data: { ...endereco_empresa }, select: { id: true } });
                const finance = await tsx.sector.create({ data: { ...financeiro }, select: { id: true } });
                const commercial = await tsx.sector.create({ data: { ...comercial }, select: { id: true } });
                const accounting = await tsx.sector.create({ data: { ...contabil }, select: { id: true } });
                const owner = await tsx.sector.create({ data: { ...socio }, select: { id: true } });
                const imagesUsers = await ApiPhpUtils(imagens, "img_profile", files);
                const Allimagens = imagesUsers.map(async (imagem) => {
                    return tsx.imagem.create({
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
}
