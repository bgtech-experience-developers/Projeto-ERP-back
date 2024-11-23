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
}
