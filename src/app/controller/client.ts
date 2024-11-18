import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/ClientService.js";
import { Files } from "../middleware/ClientValidator.js";
interface ClientCreate {
  cliente: ClientC;
  endereco_entrega: Address;
  endereco_empresa: Address;
  financeiro: GenericFields;
  socio: GenericFields;
  comercial: GenericFields;
  contabil: GenericFields;
}

export class Client {
  static CreateClient(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const clientCreate: ClientCreate = request.body;
      const imagens = request.body.allImagens as Files[];
    } catch (error) {
      next(error); //a ideia de modularização de error, o next é útil nesse caso pois avisa pro express procurar um middleware que possua 4 parametros que trivialmente é associado ao middleware de erros que eu ja define
    }
  }
}
