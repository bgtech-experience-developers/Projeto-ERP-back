import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/ClientService.js";
import { Files } from "../middleware/ClientValidator.js";
import { number } from "joi";
import { AllError } from "../error/AllError.js";
export interface ClientCreate {
  cliente: ClientC;
  endereco_entrega: Address;
  endereco_empresa: Address;
  financeiro: GenericFields;
  socio: GenericFields;
  comercial: GenericFields;
  contabil: GenericFields;
}

export class Client {
  static async CreateClient(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const clientCreate: ClientCreate = request.body;
      const imagens = request.body.allImagens as Files[];
      const { mensagem } = await ClientService.CreateClientService(
        clientCreate,
        imagens
      );
      response.json(mensagem).status(201);
    } catch (error) {
      next(error); //a ideia de modularização de error, o next é útil nesse caso pois avisa pro express procurar um middleware que possua 4 parametros que trivialmente é associado ao middleware de erros que eu ja define
    }
  }
  static async getAllAddress(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params;
      if (Number(id)) {
        console.log(id);
        const [allAddress] = await ClientService.getAllAddress(Number(id));
        console.log(allAddress);
        response.json(allAddress).status(200);
        return;
      }
      throw new AllError("soment numeros");
    } catch (error) {
      next(error);
    }
  }
}
