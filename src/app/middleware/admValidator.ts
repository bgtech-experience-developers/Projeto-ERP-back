import { NextFunction, Request, Response } from "express";
import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
export interface login {
  cnpj: string;
  password: string;
}

export class AdmValidator {
  static loginValidator(
    adm?: boolean
  ): (request: Request, response: Response, next: NextFunction) => void {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        const body: login = request.body;
        body.cnpj = body.cnpj.replace(/\D/gi, "");
        body.password = body.password.replace(/\D/gi, "");

        const { error, value } = await JoiValidation.schemaLogin(body);
        if (error) {
          throw new AllError(error.message);
        }
        if (adm) {
          const query$String = request.query.permission as string;

          if (!query$String) {
            throw new AllError(
              "é necessário pelo menos uma permissão para criar um administrador"
            );
          }

          const arraystring = query$String.split(",");

          if (arraystring.length === 0 || arraystring.includes("")) {
            throw new AllError(
              "é necessário pelo menos uma permissão para criar um administrador"
            );
          }
          const permissions = arraystring.map((value) => {
            const numero = Number(value);
            if (numero) {
              if (numero > 4 || numero < 0) {
                throw new AllError("aceitável somente numeros entre 0 a 4");
              }
              return numero;
            } else {
              throw new AllError("passe somente numeros ");
            }
          });
          request.body.permissions = permissions;
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
  static passwordValidator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const newPassword = request.body.newPassword;
      const regexPassword = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/;
      if (regexPassword.test(newPassword)) {
        request.body = newPassword;
        next();
        return;
      }
      throw new AllError(
        "formato de senha não aceitável, coloque pelo menos 1 letra maiscula e um caracter especial"
      );
    } catch (error) {
      next(error);
    }
  }
}
