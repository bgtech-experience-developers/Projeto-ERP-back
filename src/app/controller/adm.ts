import { NextFunction, Request, Response } from "express";
import { AdmService } from "../service/Adm.js";

 class Adm {
  async login(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
      const token: string = await AdmService.login(request.body);
      return response.json("seu token gerado é " + token).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getAll(request: Request<any, any, any, {page: number}>, response: Response, next: NextFunction) {

    try {
      const adm = await AdmService.getAll(request.query);

       response.json({
        adm,
        message: `Na page ${request.query.page} foi gerado mais 4 registros.`
      }).status(200)

      return
    } catch(error) {
      next(error)
    }
  }

}

export default new Adm;
