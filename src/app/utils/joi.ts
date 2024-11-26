import joi from "joi";
import { login } from "../middleware/admValidator.js";
export class JoiValidation {
  static async schemaCreateClient<$Interface extends integral>({
    contabil,
    comercial,
    socio,
    endereco_empresa,
    endereco_entrega,
    cliente,
    financeiro,
  }: bodyCreateClient) {
    const schemaCreateClient = joi.object<$Interface, false, $Interface>({
      branch_activity: joi.string().trim(),
      cnpj: joi.string().trim().min(14).max(14).required(),
      state_registration: joi.string().trim().min(9).max(9),
      type_contribuition: joi.string().trim().required(),
      fantasy_name: joi.string().trim(),
      corporate_reason: joi.string().trim(),
    });
    const SchemaCreateSector = joi.object<$Interface, false, $Interface>({
      cell_phone: joi.string().trim(),
      name: joi.string().trim(),
      email: joi.string().email().required(),
      phone: joi.string().trim(),
      rg: joi.string().min(9).max(9),
      photo: joi.string(),
      cpf:joi.string().max(11).min(11).messages({
        "string.max": "o campo deve conter no maximo 14 digitos",
          "string.min": "o campo cpf deve conter pelo menos 14 digitos",
      })
    });
    const SchemaAddress = joi.object<$Interface, false, $Interface>({
      cep: joi.string().min(8).max(8).trim(),
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
  static async schemaLogin(body: login) {
    try {
      const schemalogin = joi.object<login, true, login>({
        cnpj: joi.string().max(14).min(14).trim().required().messages({
          "string.max": "o campo deve conter no maximo 14 digitos",
          "string.min": "o campo cnpj deve conter pelo menos 14 digitos",
        }),
        password: joi.string().trim(),
      });

      return schemalogin.validate(body);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
