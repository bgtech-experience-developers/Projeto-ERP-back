import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
export class ClientValidator {
    CreateClientValidator() {
        return async (request, response, next) => {
            try {
                const files = request.files;
                console.log(files);
                request.body = JSON.parse(request.body.json);
                // request.body.telefone = request.body.telefone.replace(/\D/g, "");
                // request.body.cpf = request.body.cpf.replace(/\D/g, "");
                // request.body.cnpj = request.body.cnpj.replace(/\D/g, "");
                // request.body.cep = request.body.cep.replace(/\D/g, "");
                const allPromises = await JoiValidation.schemaCreateClient(request.body);
                const err = allPromises.filter((promise) => promise.error ? promise.error.message : false);
                err.forEach((err) => console.log(err.error?.message));
                if (err.length != 0) {
                    Sharp.removeImagens(files);
                    const messagem = err[0].error?.message;
                    throw new AllError(messagem, 400);
                }
                const allImagens = await Sharp.limpezaSharp(files, next);
                const error = allImagens.filter(({ error }) => {
                    return error ? error : false;
                });
                if (error.length != 0) {
                    Sharp.removeImagens(files);
                    throw new AllError(error[0].mesagem);
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
