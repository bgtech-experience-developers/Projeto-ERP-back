import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../../../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
export class ClientValidator {
    CreateClientValidator() {
        return async (request, response, next) => {
            try {
                const files = request.files;
                request.body = JSON.parse(request.body.json);
                const order = request.body.imagens;
                const allPromises = await JoiValidation.schemaCreateClient(request.body);
                const err = allPromises.filter((promise) => promise.error ? promise.error : false);
                err.forEach((err) => console.log(err));
                if (err.length != 0) {
                    throw new AllError("alguns campos não são compativeis", 400);
                }
                const { mensagem, error } = Sharp.limpezaSharp(files, next);
                if (error) {
                    throw new AllError(mensagem);
                }
                const allImagens = Sharp.allImagens(files, order);
                request.body.allImagens = allImagens;
                next();
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
    }
}
