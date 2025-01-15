import joi from "joi";
import { AllError } from "../error/AllError.js";
// import { Address } from "node:cluster";
// import { integral, bodyCreateClient, BodySupplierPf, Supplier_pf, Address } from "../interfaces/global.js";
export class JoiValidation {
    static async schemaCreateClient({ contabil, comercial, socio, endereco_empresa, endereco_entrega, cliente, financeiro, }) {
        const schemaCreateClient = joi.object({
            branch_activity: joi.string().trim().allow(""),
            cnpj: joi.string().trim().min(14).max(14).required().messages({
                "string.max": "o campo cnjp deve conter no maximo 14 digitos",
                "string.min": "o compo cnjp deve conter no minimo 14 digitos",
            }),
            state_registration: joi
                .string()
                .trim()
                .max(50)
                .optional()
                .messages({
                "string.max": "o campo inscrição estadual deve conter no maximo 50 digitos",
            })
                .allow(""),
            type_contribuition: joi.string().trim().allow(""),
            fantasy_name: joi.string().trim().allow(""),
            corporate_reason: joi.string().trim(),
        });
        const SchemaCreateSector = joi.object({
            cell_phone: joi.string().trim().allow(""),
            name: joi.string().trim().allow(""),
            email: joi.string().email().allow(""),
            phone: joi.string().trim().allow(""),
            rg: joi.string().allow(""),
            cpf: joi
                .string()
                .max(11)
                .min(11)
                .messages({
                "string.max": "o campo cpf deve conter no maximo 11 digitos",
                "string.min": "o campo cpf deve conter pelo menos 11 digitos",
            })
                .allow(""),
        });
        const SchemaAddress = joi.object({
            cep: joi
                .string()
                .min(8)
                .max(8)
                .trim()
                .messages({
                "string.max": "o campo cep deve conter no maximo 8 digitos",
                "string.min": "o campo cep deve conter pelo menos 8 digitos",
            })
                .allow(""),
            street: joi.string().trim().allow(""),
            number: joi.string().trim().allow(""),
            complement: joi.string().trim().allow(""),
            city: joi.string().trim().allow(""),
            neighborhood: joi.string().trim().allow(""),
            state: joi.string().trim().allow(""),
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
                password: joi
                    .string()
                    .trim()
                    .regex(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/)
                    .messages({
                    "string.pattern.base": "formato de senha não aceitável, coloque pelo menos 1 letra maiscula e um caracter especial",
                }),
                email: joi.string().email(),
            });
            return schemalogin.validate(body);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async schemaCreateSupplierPf({ supplier, address, }) {
        const schemaSupplier = joi.object({
            supplier_name: joi.string().trim().required(),
            supplier_code: joi.string().trim().allow(""),
            email: joi.string().trim().allow(""),
            phone: joi.string().trim().allow(""),
            // cell_phone: joi.string().trim().allow(""),
            rg: joi.string().trim().allow(""),
            cpf: joi.string().trim().required().min(11).max(11).messages({
                "string.max": "O campo cpf deve conter no máximo 11 digitos",
                "string.min": "O campo cpf deve conter no mínimo 11 digitos",
            }),
            birth_date: joi.string().trim().allow(""),
            status: joi.optional(),
        });
        // const schemaProduct = joi.object<Product_Supplier_pf>({
        //   // name: joi.string().trim().allow(""),
        //   price: joi.string().trim().allow(""),
        //   delivery_time: joi.string().trim().allow(""),
        //   purchase_tax: joi.string().trim().allow(""),
        // })
        const schemaAddress = joi.object({
            cep: joi.string().trim().allow(""),
            street: joi.string().trim().allow(""),
            number: joi.string().trim().allow(""),
            complement: joi.string().trim().allow(""),
            city: joi.string().trim().allow(""),
            neighborhood: joi.string().trim().allow(""),
            state: joi.string().trim().allow(""),
        });
        const { value: newSupplier, error: errorSupplier } = schemaSupplier.validate(supplier);
        // const {value: newProduct, error: errorProduct} = schemaProduct.validate(product)
        const { value: newAddress, error: errorAddress } = schemaAddress.validate(address);
        if (errorSupplier || errorAddress) {
            const error = errorSupplier?.message || errorAddress?.message;
            throw new AllError(error ? error : "");
        }
        return {
            supplier: newSupplier,
            address: newAddress,
            // product: newProduct
        };
    }
}
