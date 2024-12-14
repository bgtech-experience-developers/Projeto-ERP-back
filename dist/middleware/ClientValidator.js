import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
export class ClientValidator {
    CreateClientValidator() {
        return async (request, response, next) => {
            try {
                console.log(request.body.json);
                console.log(request.body);
                const files = request.files;
                console.log(files);
                request.body = JSON.parse(request.body.json);
                // request.body.telefone = request.body.telefone.replace(/\D/g, "");
                // request.body.cpf = request.body.cpf.replace(/\D/g, "");
                request.body.cliente.cnpj = request.body.cliente.cnpj.replace(/\D/g, "");
                request.body.endereco_empresa.cep =
                    request.body.endereco_empresa.cep.replace(/\D/g, "");
                request.body.endereco_entrega.cep =
                    request.body.endereco_entrega.cep.replace(/\D/g, ""); // request.body.cep = request.body.cep.replac\D/g, ""
                request.body.endereco_entrega.cep.replace(/\D/g, "");
                const arraySector = [
                    "financeiro",
                    "comercial",
                    "socio",
                    "contabil",
                ];
                arraySector.forEach((string, index) => {
                    request.body[string].cpf = request.body[string].cpf.replace(/\D/g, "");
                    request.body[string].rg = request.body[string].rg.replace(/\D/g, "");
                    console.log(`esse é o setor ${string}, com o seu cpf todo sanitizado após a sua limpeza ${request.body[string].cpf}`);
                    console.log(`esse ainda é o setor ${string}, com o seu rg todo sanitizado após a sua limpeza ${request.body[string].rg}`);
                });
                const allPromises = await JoiValidation.schemaCreateClient(request.body);
                const err = allPromises.filter((promise) => promise.error ? promise.error.message : false);
                err.forEach((err) => console.log(err.error?.message));
                if (err.length != 0) {
                    console.log(request.body);
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
