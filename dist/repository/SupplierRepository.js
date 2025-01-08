import { InstanciaPrisma } from "../db/PrismaClient.js";
export default class SupplierRepository {
    static connectionDb = InstanciaPrisma.GetConnection();
    // Estudar Promisse.All()
    // : Promise<AllSupplier_pf[] | null> 
    static async getAll(skip) {
        try {
            return this.connectionDb.supplier_pf.findMany({
                take: 10,
                skip,
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getAllByStatus(skip, status) {
        try {
            return await this.connectionDb.supplier_pf.findMany({
                where: {
                    status: status
                },
                take: 10,
                skip
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const supplier = await this.connectionDb.supplier_pf.findUnique({
                where: {
                    id
                },
                include: {
                    // product_supplier_pf: {
                    //    include: {
                    //        product: true
                    //     }
                    // },
                    address_supplier_pf: {
                        select: {
                            // O campo do json irá mudar
                            id_address: true,
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
            });
            return [supplier];
        }
        catch (error) {
            throw error;
        }
    }
    static async getByCpf(cpf) {
        try {
            const supplier = await this.connectionDb.supplier_pf.findUnique({
                where: {
                    cpf
                },
                include: {
                    // product_supplier_pf: {
                    //    include: {
                    //        product: true
                    //     }
                    // },
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
            });
            return supplier;
        }
        catch (error) {
            throw error;
        }
    }
    static async setSupplier({ supplier, address }, image) {
        try {
            const supplierQuery = this.connectionDb.$transaction([
                this.connectionDb.supplier_pf.create({
                    data: {
                        ...supplier,
                        address_supplier_pf: {
                            create: {
                                address: {
                                    create: {
                                        ...address
                                    }
                                }
                            }
                        },
                        supplier_imagem: {
                            create: {
                                supplier_pf_image: {
                                    create: {
                                        path: image
                                    }
                                }
                            }
                        }
                    }
                })
            ]);
            return supplierQuery;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteSupplier(id) {
        try {
            return this.connectionDb.supplier_pf.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getImage(id_supplier_pf) {
        try {
            const path = await this.connectionDb.supplier_pf_Image.findFirst({
                where: {
                    supplier_pf: {
                        id: id_supplier_pf
                    }
                },
                select: {
                    supplier_pf_image: {
                        select: {
                            path: true
                        }
                    }
                }
            });
            return path?.supplier_pf_image?.path || null;
        }
        catch (error) {
            throw error;
        }
    }
    static async updateSupplier(id, idAddress, idImage, { supplier, address }, image) {
        try {
            // await this.connectionDb.supplier_pf.update({
            //     where: {
            //         id: id
            //     },
            //     data: {
            //         ...supplier,
            //         address_supplier_pf: {
            //             update: {
            //                 where: {
            //                     id_supplier_pf: id, id_address: id
            //                 },
            //                 data: {
            //                     address: {
            //                         update: {
            //                             where: {
            //                                 address_supplier_pf: id
            //                             },
            //                             data: {
            //                                 ...address
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // })
            // [
            //     this.connectionDb.supplier_pf.update({
            //         where: {
            //             id
            //         }, 
            //         data: {
            //             ...supplier                   
            //         }
            //     }) 
            // ]
            console.log({ supplier });
            await this.connectionDb.$transaction(async (conn) => {
                await conn.supplier_pf.update({
                    where: {
                        id,
                    },
                    data: {
                        ...supplier
                    }
                });
                await conn.supplier_pf_address.update({
                    where: {
                        id_address_id_supplier_pf: {
                            id_address: idAddress,
                            id_supplier_pf: id
                        }
                    },
                    data: {
                        address: {
                            update: {
                                ...address
                            }
                        }
                    }
                });
                await conn.supplier_pf_image.update({
                    where: {
                        id_image_id_supplier_pf: {
                            id_image: idImage,
                            id_supplier_pf: id
                        }
                    },
                    data: {
                        supplier_pf_image: {
                            update: {
                                path: image
                            }
                        }
                    }
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getFilterByStatus({ cpf, email, supplier_name, phone }, status, page) {
        try {
            return await this.connectionDb.supplier_pf.findMany({
                where: {
                    OR: [
                        { supplier_name: { contains: supplier_name.contanis } },
                        { email: { contains: email.contanis } },
                        { phone: { contains: phone.contanis } },
                        { cpf: { contains: cpf.contanis } }
                    ],
                    AND: { status: status === "true" ? true : false },
                },
                select: {
                    id: true,
                    supplier_name: true,
                    email: true,
                    phone: true,
                    cpf: true
                },
                skip: page,
                take: 10
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getFilter({ cpf, email, supplier_name, phone }, page) {
        try {
            return await this.connectionDb.supplier_pf.findMany({
                where: {
                    OR: [
                        { supplier_name: { contains: supplier_name.contanis } },
                        { email: { contains: email.contanis } },
                        { phone: { contains: phone.contanis } },
                        { cpf: { contains: cpf.contanis } }
                    ],
                },
                select: {
                    id: true,
                    supplier_name: true,
                    email: true,
                    phone: true,
                    cpf: true
                },
                skip: page,
                take: 10
            });
        }
        catch (error) {
            throw error;
        }
    }
}
