import { AllError } from "../error/AllError.js";
import { SupplierRepository } from "../repository/SupplierRepository.js";
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
                        product_supplier_pf: [
                            ...resultQuery.product_supplier_pf.map(({ product }) => {
                                return { product };
                            })
                        ],
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
}
