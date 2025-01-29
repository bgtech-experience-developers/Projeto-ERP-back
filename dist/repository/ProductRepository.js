import { PrismaClient } from '@prisma/client';
import { InstanciaPrisma } from "../db/PrismaClient.js";
const prima = new PrismaClient();
export default class ProductRepository {
    static connectionDb = InstanciaPrisma.GetConnection();
    // Definir o tipo de dado dos argumentos das funções.
    static async createProduct(data) {
        try {
            // Adicionar o relacionamento de product com fornecedor
            return this.connectionDb.product.create({
                data
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getAll(take, skip) {
        try {
            return this.connectionDb.product.findMany({
                take,
                skip,
                select: {
                    barcode: true,
                    name: true,
                    supplier_name: true,
                    cost_value: true,
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async countAll() {
        try {
            return this.connectionDb.supplier_pf.count();
        }
        catch (error) {
            throw error;
        }
    }
}
