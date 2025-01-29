import { AllError } from "../error/AllError.js";
import SupplierRepository from "../repository/SupplierRepository.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { deleteApiPhp } from "../middleware/ApiPhp.js";
// import { BodySupplierPf, filterSupplierPf } from "../interfaces/global.js";
export class SupplierService {
    // : Promise<AllSupplier_pf[] | null>
    static async getAll(page) {
        try {
            if (Number(page)) {
                const offset = (Number(page) - 1) * 10;
                return await SupplierRepository.getAll(offset);
            }
            throw new AllError("Parametros inválidos!", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async getAllByStatus(page, status) {
        try {
            if (Number(page)) {
                const offset = (Number(page) - 1) * 10;
                // Criei uma redundância para não quebrar a query, se não especificar que é true, automaticamente é false.
                // Aqui pode ser o erro
                const newStatus = status === "true" ? true : false;
                // console.log(newStatus);
                // console.log(offset)
                // if (typeof newStatus !== "boolean") {
                //    throw new AllError("Parâmetro 'status' inválido!");
                // }
                return newStatus ? await SupplierRepository.getAllByStatus(offset, newStatus) : await SupplierRepository.getAllByStatus(offset, newStatus);
            }
            throw new AllError("Parametros inválidos!", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            if (Number(id)) {
                const resultQuery = await SupplierRepository.getById(Number(id));
                console.log(resultQuery[0]);
                if (!resultQuery[0]) {
                    throw new AllError("Usuário não encontrado no sistem!", 404);
                }
                const supplier = resultQuery.map(({ ...resultQuery }) => {
                    return {
                        ...resultQuery,
                        address_supplier_pf: [
                            ...resultQuery.address_supplier_pf.map(({ address }) => {
                                return { address };
                            })
                        ],
                        supplier_imagem: [
                            // ...resultQuery.supplier_imagem[0].supplier_pf_image.path
                            ...resultQuery.supplier_imagem.map(({ supplier_pf_image }) => {
                                return supplier_pf_image.path;
                            })
                        ]
                    };
                });
                return supplier;
            }
            throw new AllError("Parametros inválidos!", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async setSupplier(body, image) {
        try {
            const supplier = await SupplierRepository.getByCpf(body.supplier.cpf);
            console.log(supplier);
            if (supplier) {
                throw new AllError("Usuário já cadastrado no sistema!", 409);
            }
            if (image) {
                const file = image.path;
                const apiPhp = await ApiPhpUtils([file], "img_profile", [image]);
                console.log(apiPhp[0]);
                await SupplierRepository.setSupplier(body, apiPhp[0]);
                return;
            }
            await SupplierRepository.setSupplier(body, null);
            return;
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteSupplier(id) {
        try {
            console.log(id);
            if (Number(id)) {
                const [supplier] = await SupplierRepository.getById(Number(id));
                if (!supplier) {
                    throw new AllError("Usuário não encontrado no sistema!", 404);
                }
                const path = await SupplierRepository.getImage(Number(id));
                console.log(path);
                const newPath = path?.replace("https://bgtech.com.br/erp/assets/", "");
                console.log(newPath);
                if (newPath) {
                    await deleteApiPhp([newPath]);
                }
                await SupplierRepository.deleteSupplier(Number(id));
                return;
            }
            throw new AllError("Parametros inválidos!", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async updateSupplier(body, image, id) {
        try {
            if (Number(id)) {
                const supplier = await SupplierRepository.getById(Number(id));
                console.log(supplier);
                if (!supplier[0]) {
                    throw new AllError("Usuário não encontrado no sistema!");
                }
                const idAddress = supplier[0]?.address_supplier_pf[0].id_address;
                const idImage = supplier[0]?.supplier_imagem[0].id_image;
                const pathExist = supplier[0]?.supplier_imagem[0].supplier_pf_image.path;
                if (pathExist) {
                    const newPath = pathExist?.replace("https://bgtech.com.br/erp/assets/", "");
                    await deleteApiPhp([newPath]);
                }
                if (image) {
                    const file = image.path;
                    console.log(file);
                    const apiPhp = await ApiPhpUtils([file], "img_profile", [image]);
                    console.log(apiPhp[0]);
                    idAddress && idImage ? await SupplierRepository.updateSupplier(Number(id), idAddress, idImage, body, apiPhp[0]) : null;
                    return;
                }
                console.log(idAddress);
                console.log(body);
                // console.log('chehuei aqui');
                idAddress && idImage ? await SupplierRepository.updateSupplier(Number(id), idAddress, idImage, body, null) : null;
                return;
            }
            throw new AllError("Parametros inválidos!", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async getByFilter(page, status, value) {
        try {
            const filterCondition = this.FilterContains(value, [
                "supplier_name",
                "cpf",
                "email",
                "phone"
            ]);
            const offset = (Number(page) - 1) * 10;
            return status ? await SupplierRepository.getFilterByStatus(filterCondition, status, offset) : SupplierRepository.getFilter(filterCondition, offset);
        }
        catch (error) {
            throw error;
        }
    }
    // static async getAllByStatus(page: string | number, status: string | null) {
    //     try {
    //         const offset = (Number(page) - 1) * 10;
    //         return status ? await SupplierRepository.getAllByStatus(offset, status) : await SupplierRepository.getAll(offset)
    //     } catch(error) {
    //         throw error;            
    //     }
    // }
    static FilterContains(value, fields) {
        const filter = {
            supplier_name: { contanis: "" },
            cpf: { contanis: "" },
            email: { contanis: "" },
            phone: { contanis: "" },
        };
        fields.forEach((field, index) => {
            filter[field] = { contanis: value };
        });
        return filter;
    }
}
