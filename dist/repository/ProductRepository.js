import { PrismaClient } from '@prisma/client';
import { InstanciaPrisma } from "../db/PrismaClient.js";
const prima = new PrismaClient();
export default class ProductRepository {
    static connectionDb = InstanciaPrisma.GetConnection();
    static async createProduct(data) {
        try {
            return this.connectionDb.product.create({
                data
            });
        }
        catch (error) {
            throw error;
        }
    }
}
