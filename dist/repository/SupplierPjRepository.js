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
            const [registerSupplier] = (await this.connection
                .$queryRaw `SELECT s.*, a.*,i.*,p.id_address FROM supplier_pj s LEFT JOIN imagem AS i ON s.id_imagem = i.id LEFT JOIN supplier_pj_address AS p ON p.id_supplier = s.id LEFT JOIN address AS a ON p.id_address = a.id WHERE s.id = ${id}`);
            return registerSupplier;
        }
        catch (error) {
            throw error;
        }
    }
    static async filterSupplier({ email, phone, corporate_reason, answerable }, page, limit) {
        try {
            return await this.connection
                .$queryRaw `SELECT p.email,p.phone,p.corporate_reason,p.answerable,p.id FROM supplier_pj p WHERE p.email LIKE ${email.contanis} or p.phone LIKE ${phone.contanis} or p.corporate_reason LIKE ${corporate_reason.contanis} or p.answerable LIKE ${answerable.contanis}`;
        }
        catch (error) {
            throw error;
        }
    }
    static async filterSupplierByStatus({ email, phone, corporate_reason, answerable }, status, page, limit) {
        try {
            return await this.connection
                .$queryRaw `SELECT p.email,p.phone,p.corporate_reason,p.answerable,p.id FROM supplier_pj p WHERE (p.email LIKE ${email.contanis} or p.phone LIKE ${phone.contanis} or p.corporate_reason LIKE ${corporate_reason.contanis} or p.answerable LIKE ${answerable.contanis}) AND p.status = ${status === "true" ? 1 : 0}`;
        }
        catch (error) {
            throw error;
        }
    }
    static async getAll(page, limit) {
        try {
            const registerColaboraters = await this.connection
                .$queryRaw `SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM supplier_pj s LIMIT ${limit} OFFSET ${page}`;
            return registerColaboraters;
        }
        catch (error) {
            throw error;
        }
    }
    static getSuppliersByStatus(status, pageSized, limit) {
        try {
            return this.connection
                .$queryRaw `SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM supplier_pj s WHERE s.status = ${status} limit ${pageSized} offset ${limit}`;
        }
        catch (error) {
            throw error;
        }
    }
    static async updateByIdSupplier({ pj, address }, image, supplierId, addressId, imagemId) {
        try {
            return await this.connection.$transaction(async (tsx) => {
                await tsx.supplier_pj.update({
                    where: { id: supplierId },
                    data: { ...pj },
                });
                await tsx.address.update({
                    where: { id: addressId },
                    data: { ...address },
                });
                await tsx.imagem.update({
                    where: { id: imagemId },
                    data: { path: image instanceof Array ? image[0] : image },
                });
                return `fornecedor atualizado com Êxito`;
            });
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
                const supplier = await tsx.supplier_pj.create({
                    data: { ...pj, id_imagem: imageId.id },
                });
                await tsx.supplier_pj_address.create({
                    data: { id_address: addressId.id, id_supplier: supplier.id },
                });
                return "fornecedor cadastrado com sucesso";
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    static async removeSupplierByAddressAndImage(addressId, ImageId) {
        try {
            const message = await this.connection.$transaction(async (tsx) => {
                await tsx.address.delete({ where: { id: addressId } });
                await tsx.imagem.delete({ where: { id: ImageId } });
                return `fornecedor deletado com sucesso`;
            });
            return message;
        }
        catch (error) {
            throw error;
        }
    }
}
