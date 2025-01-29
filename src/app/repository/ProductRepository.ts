import {PrismaClient} from '@prisma/client';
import { InstanciaPrisma } from "../db/PrismaClient.js";

const prima = new PrismaClient();

export default class ProductRepository {
    protected static connectionDb: PrismaClient = InstanciaPrisma.GetConnection();

    // Definir o tipo de dado dos argumentos das funções.
    static async createProduct(data: any) {
        try {
            // Adicionar o relacionamento de product com fornecedor
            return this.connectionDb.product.create({
                data
            });
        } catch (error) {
            throw error;
        }
    }

    static getAll(take: number, skip: number) {
        try {
            this.connectionDb.product.findMany({
                take,
                skip,
            })
        } catch(error) {
            throw error;
        }
    }

    
}