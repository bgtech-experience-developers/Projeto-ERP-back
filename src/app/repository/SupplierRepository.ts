import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";


export class SupplierRepository {
    protected static connectionDb: PrismaClient = InstanciaPrisma.GetConnection();

    // Estudar Promisse.All()
    // : Promise<AllSupplier_pf[] | null> 
    static async getAll(skip: number) {
        try {

            return this.connectionDb.supplier_pf.findMany({
                take:10,
                skip,
                include: {
                    product_supplier_pf: {
                        select: {
                            product: {
                                select: {
                                    name:true
                                }
                            }
                        }
                    }
                }
            })

        } catch(error) {
            throw error
        }


    } 

    static async getById(id: number) {
        try {

            const supplier =  await this.connectionDb.supplier_pf.findUnique({
                where: {
                    id
                },
                include: {
                    product_supplier_pf: {
                       include: {
                           product: true
                        }
                    },
                    address_supplier_pf: {
                        include: {
                            address: true
                        }
                    },
                    supplier_imagem: {
                        include: {
                            supplier_pf_image: {
                                select: {
                                    path: true
                                }
 
                            }
                        }
                    }
                }

            })
            return [supplier]
        } catch(error) {
            throw error
        }

    }
}