import { NextFunction, Request, Response } from "express";
import { JoiValidation } from "../utils/joi.js";
import { AllError } from "../error/AllError.js";
import { Sharp } from "../utils/sharp.js";
import sharp from "sharp";
export interface Files {
  filename: string;
  [key: string]: string;
}

export class ClientValidator {
  CreateClientValidator<$Interface>() {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        const files = request.files;
        const order: boolean[] = request.body.imagens;
        const allPromises = await JoiValidation.schemaCreateClient(
          request.body
        );
        const err = allPromises.filter((promise) =>
          promise.error ? promise.error : false
        );
        if (err.length != 0) {
          throw new AllError("alguns campos não são compativeis", 400);
        }
        //hora de fazer a sanatizaçao dos campos de files7
        if (files instanceof Array) {
          const { mensagem, error } = Sharp.limpezaSharp(files, next);
          if (error) {
            throw new AllError(mensagem);
          }
          const allImagens = Sharp.allImagens(files, order);
          request.body.allImagens = allImagens;

          next();
        } else {
          throw new AllError("formato de arquivo não esperado");
        }
      } catch (error) {
        next(error);
      }
    };
  }
}
