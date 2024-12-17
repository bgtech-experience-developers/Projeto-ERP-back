import { SupplierService } from "../service/SupplierService.js";
export class SupplierController {
    // <AllSupplier_pf[] | null>
    static async getAll(request, response, next) {
        try {
            // const AllSupplier: AllSupplier_pf[] | null = await SupplierService.getAll(request.query.page)
            const allSuppliers = await SupplierService.getAll(request.query.page);
            response.status(200).json(allSuppliers);
            return;
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(request, response, next) {
        try {
            const supplier = await SupplierService.getById(request.params.id);
            response.status(200).json(supplier);
            return;
        }
        catch (error) {
            next(error);
        }
    }
    static async setSupplier(request, response, next) {
        try {
            const image = request.file;
            await SupplierService.setSupplier(request.body, image);
            response.status(201).json("Usuário cadastrado com sucesso");
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
