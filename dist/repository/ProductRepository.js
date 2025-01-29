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
}
