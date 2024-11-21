import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/ClientService.js";
import { Files } from "../middleware/ClientValidator.js";
import { ClientRepository } from "../repository/clientRepository.js";


const {showCLients, showClientById} = new ClientRepository

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
  static async CreateClient(
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

  async showClients(request: Request, response: Response, next: NextFunction){
      try{
        const showClient = await showCLients()
        response.send(showClient)
      }catch(err){
        console.log(err)
        response.status(500).json({message: 'erro interno do servidor! :('})
        next(err) 
      }
  }

  async showClientById(request: Request, response: Response, next: NextFunction){
    try {
      const {id} = request.params
      const showOneClient = await showClientById(id)
      response.send(showOneClient)
    } catch (err) {
      console.log(err)
      response.status(500).json({message: 'erro interno do servidor! :('})
      next(err)S
    }
  }
}
