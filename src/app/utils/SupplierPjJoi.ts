import Joi from "joi";
import { setSupplier, SupplierPj } from "../middleware/SupplierPjValidator.js";
export class SupplierPjJoi {
  static async setSupplierPj<$interface extends Address>({
    pj,
    address,
  }: SupplierPj) {
    try {
      const schemaSetSupplier = Joi.object<setSupplier, false, setSupplier>({
        answerable: Joi.string().allow(""),
        cnpj: Joi.string().required().max(14).min(14).messages({
          "string.max": "o campo cnjp deve conter no maximo 14 digitos",
          "string.min": "o compo cnjp deve conter no minimo 14 digitos",
        }),
        suframa_registration: Joi.string().allow(""),
        email: Joi.string().email().allow(""),
        phone: Joi.string().allow(""),
        municipal_registration: Joi.string().allow(""),
        state_registration: Joi.string()
          .trim()
          .max(50)
          .optional()
          .messages({
            "string.max":
              "o campo inscrição estadual deve conter no maximo 9 digitos",
          })
          .allow(""),
        type_contribuition: Joi.string().trim().allow(""),
        fantasy_name: Joi.string().trim().allow(""),
        corporate_reason: Joi.string().trim(),
      });
      const schemaAddress = Joi.object<$interface, false, $interface>({
        cep: Joi.string()
          .min(8)
          .max(8)
          .trim()
          .messages({
            "string.max": "o campo cep deve conter no maximo 8 digitos",
            "string.min": "o campo cep deve conter pelo menos 8 digitos",
          })
          .allow(""),
        street: Joi.string().trim().allow(""),
        number: Joi.string().trim().allow(""),
        complement: Joi.string().trim().allow(""),
        city: Joi.string().trim().allow(""),
        neighborhood: Joi.string().trim().allow(""),
        state: Joi.string().trim().allow(""),
      });
      return await Promise.all([
        schemaSetSupplier.validate(pj),
        schemaAddress.validate(address),
      ]);
    } catch (error) {
      throw error;
    }
  }
}
