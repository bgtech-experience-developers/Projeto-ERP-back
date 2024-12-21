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
                    id_supplier_pf
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
                await conn.supplier_pf_Address.update({
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
                await conn.supplier_pf_Image.update({
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
}
