import { SupplierService } from "../service/SupplierService.js";
export class SupplierController {
    // <AllSupplier_pf[] | null>
    static async getAll(request, response, next) {
        try {
            // const AllSupplier: AllSupplier_pf[] | null = await SupplierService.getAll(request.query.page)
            const AllSupplier = await SupplierService.getAll(request.query.page);
            response.status(200).json(AllSupplier);
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
