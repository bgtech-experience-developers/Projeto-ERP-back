import { InstanciaPrisma } from "../db/PrismaClient.js";
import { AllError } from "../error/AllError.js";
const connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão
export class ClientRepository {
    static async createCliente({ cliente, comercial, financeiro, contabil, socio, endereco_empresa, endereco_entrega, }, imagens) {
        try {
            console.log(imagens);
            const connectionDb = InstanciaPrisma.GetConnection();
            const [client, delivery, store, finance, commercial, accounting, owner] = await connectionDb.$transaction([
                connectionDb.client.create({
                    data: {
                        ...cliente,
                        photo: imagens[0].filename,
                    },
                    select: { id: true },
                }),
                connectionDb.address.create({ data: { ...endereco_empresa } }),
                connectionDb.address.create({ data: { ...endereco_entrega } }),
                connectionDb.sector.create({
                    data: {
                        ...financeiro,
                        photo: imagens[3] ? imagens[3].filename : null,
                    },
                }),
                connectionDb.sector.create({
                    data: {
                        ...comercial,
                        photo: imagens[2] ? imagens[2].filename : null,
                    },
                }),
                connectionDb.sector.create({
                    data: {
                        ...contabil,
                        photo: imagens[4] ? imagens[4].filename : null,
                    },
                }),
                connectionDb.sector.create({
                    data: {
                        ...socio,
                        photo: imagens[1] ? imagens[1].filename : null,
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
        }
        catch (error) {
            console.log(error);
            throw new AllError("não foi possivel cadastrar o usuário", 400);
        }
    }
    static async GetuniqueClient(cnpj) {
        try {
            const connectionDb = InstanciaPrisma.GetConnection();
            return await connectionDb.client.findFirst({ where: { cnpj } });
        }
        catch (error) {
            throw new AllError("servidor fora do ar");
        }
    }
}
