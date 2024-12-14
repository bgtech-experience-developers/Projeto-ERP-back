import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/ClientService.js";
import { Files } from "../middleware/ClientValidator.js";
import { ClientRepository } from "../repository/clientRepository.js";
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
  situation: boolean;
  [key: string]: unknown;
}

export class Client {
  static async CreateClient(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const clientCreate: ClientCreate = request.body;
      const imagens = request.files as Express.Multer.File[];
      const order: boolean[] = request.body.imagens;
      const { mensagem } = await ClientService.CreateClientService(
        clientCreate,
        imagens,
        order
      );
      response.json(mensagem).status(201);
    } catch (error) {
      next(error); //a ideia de modularização de error, o next é útil nesse caso pois avisa pro express procurar um middleware que possua 4 parametros que trivialmente é associado ao middleware de erros que eu ja define
    }
  }

  async showClients(request: Request, response: Response, next: NextFunction) {
    try {
      const showClient = await ClientService.showClints();
      const { page, pageSized, value } = request.query;

      console.log(showClient);

      response.send(showClient);
    } catch (err) {
      next(err);
    }
  }

  async showClientById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params;
      const showOneClient = await ClientService.showClientById(id);
      response.status(200).json(showOneClient);
      return;
    } catch (err) {
      console.log(err);
      next(err);
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
  static async updateClient(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const files = request.files as Express.Multer.File[];
      const order: boolean[] = request.body.imagens;
      const isActive = request.query.isActive ? false : true;
      const body: ClientCreate = request.body;

      body["situation"] = isActive;
      console.log(
        "a situação do cliente nesse exato momento é " + body.situation
      );

      const message = await ClientService.updateClient(body, order, files);
      console.log(message);
      response.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deleteClient(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.params;

      await ClientService.deleteClient(id);
      response.status(200).json("Empresa/Cliente excluído com sucesso!");
    } catch (error) {
      next(error);
    }
  }
  static async showClientsFilter(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      console.log("eu cheguei aqui");
      const query = request.query;
      if (
        query &&
        "status" in query &&
        "value" in query &&
        typeof query.value === "string"
      ) {
        const status = query.status === "true" ? true : false;
        const value = query.value;
        const result = await ClientService.filterCLient(status, value);
        response.status(200).json(result);
      } else {
        throw new AllError(
          "a query string deve conter os campos de value e status"
        );
      }
    } catch (error) {
      next(error);
    }
  }
}
