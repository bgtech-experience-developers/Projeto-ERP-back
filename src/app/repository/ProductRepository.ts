import {PrismaClient} from '@prisma/client';
import { InstanciaPrisma } from "../db/PrismaClient.js";

const prima = new PrismaClient();

export default class ProductRepository {
    protected static connectionDb: PrismaClient = InstanciaPrisma.GetConnection();

    static async createProduct(data: any) {
        try {
            return this.connectionDb.product.create({
                data
            });
        } catch (error) {
            throw error;
        }
    }
}