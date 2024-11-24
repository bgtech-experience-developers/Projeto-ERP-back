import { NextFunction, Request, Response } from "express";
import { AdmService } from "../service/Adm.js";

export class Adm {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const token: string = await AdmService.login(request.body);
      response.json("seu token gerado é " + token).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getAll(request: Request, response: Response, next: NextFunction) {

    try {
      const adm = await AdmService.getAll(request.body);

      return response.json({
        adm,
        message: `Na page ${request.body.page} foi gerado mais 4 registros.`
      })
    } catch(error) {
      next(error)
    }
  }

}
