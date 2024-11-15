import Joi from "joi";

export class JoiSchemas {
    
    admCreate() {
        const admSchema = Joi.object<Adm, false, Adm>({
            cnpj:Joi.string().min(14).max(14).trim().required(),
            password: Joi.string().required()
        })

        return admSchema;
    }
}