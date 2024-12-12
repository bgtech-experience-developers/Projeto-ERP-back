import { InstanciaPrisma } from "../db/PrismaClient.js";
export class SupplierRepository {
    static connectionDb = InstanciaPrisma.GetConnection();
    // Estudar Promisse.All()
    // : Promise<AllSupplier_pf[] | null> 
    static async getAll(skip) {
        try {
            return this.connectionDb.supplier_pf.findMany({
                take: 10,
                skip,
                include: {
                    product_supplier_pf: {
                        select: {
                            product: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
}
