import joi from "joi";
export class JoiValidation {
    static async schemaCreateClient({ contabil, comercial, socio, endereco_empresa, endereco_entrega, cliente, financeiro, }) {
        const schemaCreateClient = joi.object({
            branch_activity: joi.string().trim(),
            cnpj: joi.string().trim().min(14).max(14).required().messages({
                "string.max": "o campo cnjp deve conter no maximo 14 digitos",
                "string.min": "o compo cnjp deve conter no minimo 14 digitos",
            }),
            state_registration: joi.string().trim().min(9).max(9).messages({
                "string.max": "o campo inscrição estadual deve conter no maximo 9 digitos",
                "string.min": "o compo inscrição estadual deve conter no minimo 9 digitos",
            }),
            type_contribuition: joi.string().trim().required(),
            fantasy_name: joi.string().trim(),
            corporate_reason: joi.string().trim(),
        });
        const SchemaCreateSector = joi.object({
            cell_phone: joi.string().trim(),
            name: joi.string().trim(),
            email: joi.string().email().required(),
            phone: joi.string().trim(),
            rg: joi.string().min(9).max(9).messages({
                "string.max": "o campo rg deve conter no maximo 9 digitos",
                "string.min": "o campo rg deve conter pelo menos 9 digitos",
            }),
            photo: joi.string(),
            cpf: joi.string().max(11).min(11).messages({
                "string.max": "o campo cpf deve conter no maximo 11 digitos",
                "string.min": "o campo cpf deve conter pelo menos 11 digitos",
            }),
        });
        const SchemaAddress = joi.object({
            cep: joi.string().min(8).max(8).trim().messages({
                "string.max": "o campo cep deve conter no maximo 8 digitos",
                "string.min": "o campo cep deve conter pelo menos 8 digitos",
            }),
            street: joi.string().trim(),
            number: joi.string().trim(),
            complement: joi.string().trim(),
            city: joi.string().trim(),
            neighborhood: joi.string().trim(),
        });
        return Promise.all([
            schemaCreateClient.validate(cliente),
            SchemaCreateSector.validate(comercial),
            SchemaCreateSector.validate(socio),
            SchemaCreateSector.validate(financeiro),
            SchemaCreateSector.validate(contabil),
            SchemaAddress.validate(endereco_empresa),
            SchemaAddress.validate(endereco_entrega),
        ]);
    }
    static async schemaLogin(body) {
        try {
            const schemalogin = joi.object({
                cnpj: joi.string().max(14).min(14).trim().required().messages({
                    "string.max": "o campo deve conter no maximo 14 digitos",
                    "string.min": "o campo cnpj deve conter pelo menos 14 digitos",
                }),
                password: joi.string().trim(),
            });
            return schemalogin.validate(body);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
