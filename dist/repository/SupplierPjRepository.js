import { InstanciaPrisma } from "../db/PrismaClient.js";
export class SupplierPjRespository {
    static connection = InstanciaPrisma.GetConnection();
    static async findSupplierByCnpj(cnpj) {
        try {
            return await this.connection.supplier_pj.findFirst({ where: { cnpj } });
        }
        catch (error) {
            throw error;
        }
    }
    static async findSupplierById(id) {
        try {
            return await this.connection.supplier_pj.findFirst({ where: { id } });
        }
        catch (error) {
            throw error;
        }
    }
    static async getAll(query, page, limit) {
        try {
        }
        catch (error) {
            throw error;
        }
    }
    static async setSupplier({ pj, address }, image) {
        try {
            const result = await this.connection.$transaction(async (tsx) => {
                const imageId = await tsx.imagem.create({
                    data: { path: image[0] },
                    select: { id: true },
                });
                const addressId = await tsx.address.create({ data: { ...address } });
                await tsx.supplier_pj.create({
                    data: { ...pj, id_imagem: imageId.id, id_address: addressId.id },
                });
                return "fornecedor cadastrado com sucesso";
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
