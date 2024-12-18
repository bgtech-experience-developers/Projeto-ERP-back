import { AllError } from "../error/AllError.js";
import { SupplierPjJoi } from "../utils/SupplierPjJoi.js";
import { SuppplierPjService } from "../service/SupplierPjService.js";
export class SupplierPjValidator {
    static async setSupplierPj(request, response, next) {
        try {
            const body = JSON.parse(request.body.json);
            body.pj.cnpj = body.pj.cnpj.replace(/\D/g, "");
            body.address.cep = body.address.cep?.replace(/\D/g, "");
            body.pj.phone = body.pj.phone.replace(/\D/g, "");
            request.body = body;
            request.body.image = request.file ? request.file : null;
            const extensionRequerid = ["image/png", "image/png", "image/jpeg"];
            if (request.file && !extensionRequerid.includes(request.file.mimetype)) {
                await SuppplierPjService.callhandleExistingImage(request.body.image);
                throw new AllError("extensão de arquivo não permitida!");
            }
            const results = await SupplierPjJoi.setSupplierPj(body);
            const err = results.filter(({ error }) => {
                return error ? error.message : false;
            });
            if (err.length != 0) {
                if (err[0].error) {
                    throw new AllError(err[0].error.message, 403);
                }
                throw new AllError("camops inválidos");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
    static async getByIdSupplier(request, response, next) {
        try {
            const id = request.params.id;
            if (!Number(id)) {
                throw new AllError(`formato não esperado, esperado um numero`);
            }
            request.body.id = Number(id);
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
