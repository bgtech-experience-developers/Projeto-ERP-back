import { NextFunction, query, Request, Response } from "express";
import { AdmService } from "../service/Adm.js";

import { AllError } from "../error/AllError.js";
export class AdmController {
  static async login(request: Request, response: Response, next: NextFunction) {

    try {
      const { token, refreshToken } = await AdmService.login(request.body);
      response
        .json(
          `seu token gerado é ${token}, e o seu refresh token gerado é ${refreshToken}`
        )
        .status(200);
    } catch (error) {
      next(error);
    }
  }
  static async createAdm(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { permissions } = request.body;
      console.log(permissions);
      
      const body = request.body;
      console.log(body);
      
      const mensagem = await AdmService.create(body, permissions);
      response.json({ mensagem }).status(201);
    } catch (error) {
      next(error);
    }
  }
  static async updateAdm() {}


  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {

  static async getAll(request: Request<any, any, any, {page: number}>, response: Response, next: NextFunction) {

    try {
      const adm = await AdmService.getAll(request.query);
      response
        .json({
          adm,
          message: `Na page ${request.body.page} foi gerado mais 4 registros.`,
        })
        .status(200);
      return;
    } catch (error) {
      next(error);

     

    }
  }
}

}



