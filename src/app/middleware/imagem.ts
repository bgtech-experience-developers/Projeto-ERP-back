import { NextFunction, Request, Response } from "express";
import { GlobalError } from "./GlobalError.js";
import { AllError } from "../error/AllError.js";

export const imagens = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const imagens: boolean[] = request.body.imagens;
    const allImage: AllImagens = imagens.map((boolean, index) => {
      if (!boolean) {
        //caso seja false vai ser tornar true
        return null;
      } else {
        if (request.files instanceof Array) {
          const files = request.files as Express.Multer.File[];
          const file = files[index];
          return file.filename;
        }
        throw new AllError("arquivo não compativel", 505);
      }
    });
    request.body = allImage;
    next();
  } catch (error) {
    next(error);
  }
};
