import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
export class AdmValidator {
    static loginValidator(adm) {
        return async (request, response, next) => {
            try {
                const body = request.body;
                const { error, value } = await JoiValidation.schemaLogin(body);
                if (error) {
                    throw new AllError(error.message);
                }
                if (adm) {
                    const query$String = request.query.permission;
                    if (!query$String) {
                        throw new AllError("é necessário pelo menos uma permissão para criar um administrador");
                    }
                    const arraystring = query$String.split(",");
                    if (arraystring.length === 0 || arraystring.includes("")) {
                        throw new AllError("é necessário pelo menos uma permissão para criar um administrador");
                    }
                    const permissions = arraystring.map((value) => {
                        const numero = Number(value);
                        if (numero) {
                            if (numero > 4 || numero < 0) {
                                throw new AllError("aceitável somente numeros entre 0 a 4");
                            }
                            return numero;
                        }
                        else {
                            throw new AllError("passe somente numeros ");
                        }
                    });
                    request.body.permissions = permissions;
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
