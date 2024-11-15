import joi from "joi";

export class JoiSchemas {
    
    admCreate() {
        const admSchema = joi.object<Adm, false, Adm>({
            cnpj: joi.string().min(14).max(14).trim().required(),
            password: joi.string().required()
        })

        return admSchema;
    }
}