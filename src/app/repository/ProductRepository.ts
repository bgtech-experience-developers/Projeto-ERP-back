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

    static async getAll(take: number, skip: number): Promise<ProductGetAll[]> {
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
            })
        } catch(error) {
            throw error;
        }
    }

    static async countAll(): Promise<number> {
        try {
            return this.connectionDb.supplier_pf.count();
        } catch(error) {
            throw error;
        }
    }

    static async getSuppliersProducts(name: string): Promise<filterSuppliersProducts[]> {
        try {
            // return await this.connectionDb.$queryRaw`SELECT supplier_name AS supplier_pf_name FROM supplier_pf WHERE supplier_name LIKE ${'%'+name+'%'} 
            // UNION ALL
            // SELECT fantasy_name AS supplier_pj_fantasy FROM supplier_pj WHERE fantasy_name LIKE ${'%'+name+'%'}`

            return await this.connectionDb.$queryRaw`SELECT supplier_name AS supplier_name, cpf, NULL AS fantasy_name, NULL as cnpj, 'PF' AS type FROM supplier_pf WHERE supplier_name LIKE ${'%'+name+'%'}
            UNION ALL
            SELECT NULL AS supplier_name, NULL as cpf, fantasy_name AS fantasy_name,cnpj, 'PJ' AS type FROM supplier_pj WHERE fantasy_name LIKE ${'%'+name+'%'}`;
        }

        catch(error) {
            throw error;
        }

    }
}

