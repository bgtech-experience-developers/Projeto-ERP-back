import { NextFunction, Request, Response } from "express";
import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
import { UploadCloudnary } from "../utils/cloudinary.js";
import sharp from "sharp";
export interface Files {
  filename: string;
  [key: string]: string;
}

export class ClientValidator {

  CreateClientValidator<$Interface>() {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        const files = request.files as Express.Multer.File[];
        console.log(files);

        request.body = JSON.parse(request.body.json);

        // Retira as Máscaras de Telefone, CPF, CNPJ e CEP.
        request.body.telefone = request.body.telefone.replace(/\D/g, "");
        request.body.cpf = request.body.cpf.replace(/\D/g, "");
        request.body.cnpj = request.body.cnpj.replace(/\D/g, "");
        request.body.cep = request.body.cep.replace(/\D/g, "");

        const allPromises = await JoiValidation.schemaCreateClient(
          request.body
        );
        const err = allPromises.filter((promise) =>
          promise.error ? promise.error : false
        );
        err.forEach((err) => console.log(err));

        if (err.length != 0) {
          Sharp.removeImagens(files);
          throw new AllError("alguns campos não são compativeis", 400);
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
      } catch (error) {
        next(error);
      }
    };
  }
}
