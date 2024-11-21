import joi from "joi";
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
      cnpj: joi.string().trim().required(),
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
}
