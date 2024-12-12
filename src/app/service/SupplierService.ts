import { AllError } from "../error/AllError.js";
import { SupplierRepository } from "../repository/SupplierRepository.js";

export class SupplierService {
    // : Promise<AllSupplier_pf[] | null>
    static async getAll(skip: string | number) {
        try {
            if(Number(skip)) {
                const offset = (Number(skip) - 1) * 10
                // const allSupplier: AllSupplier_pf[] | null = await SupplierRepository.getAll(offset)
                const allSupplier = await SupplierRepository.getAll(offset)
             return allSupplier
            } 

            throw new AllError("Parametros inválidos!", 400)

        } catch(error) {
            throw error
        }
    }
}