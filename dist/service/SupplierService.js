import { AllError } from "../error/AllError.js";
import { SupplierRepository } from "../repository/SupplierRepository.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
export class SupplierService {
    // : Promise<AllSupplier_pf[] | null>
    static async getAll(skip) {
        try {
            if (Number(skip)) {
                const offset = (Number(skip) - 1) * 10;
                // const allSupplier: AllSupplier_pf[] | null = await SupplierRepository.getAll(offset)
                return await SupplierRepository.getAll(offset);
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
            return await SupplierRepository.setSupplier(body, null);
        }
        catch (error) {
            throw error;
        }
    }
}
