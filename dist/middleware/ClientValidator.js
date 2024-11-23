import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
export class ClientValidator {
    CreateClientValidator() {
        return async (request, response, next) => {
            try {
                const files = request.files;

                const order = request.body.imagens;
                const allPromises = await JoiValidation.schemaCreateClient(request.body);
                const err = allPromises.filter((promise) => promise.error ? promise.error : false);
                if (err.length != 0) {
                    throw new AllError("alguns campos não são compativeis", 400);
                }
                //hora de fazer a sanatizaçao dos campos de files7
                if (files instanceof Array) {
                    const { mensagem, error } = Sharp.limpezaSharp(files, next);
                    if (error) {
                        throw new AllError(mensagem);
                    }
                    const allImagens = Sharp.allImagens(files, order);
                    request.body.allImagens = allImagens;
                    next();
                }
                else {
                    throw new AllError("formato de arquivo não esperado");
                request.body = JSON.parse(request.body.json);
                const allPromises = await JoiValidation.schemaCreateClient(request.body);
                const err = allPromises.filter((promise) => promise.error ? promise.error : false);
                err.forEach((err) => console.log(err));
                if (err.length != 0) {
                    Sharp.removeImagens(files);
                    throw new AllError("alguns campos não são compativeis", 400);
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
