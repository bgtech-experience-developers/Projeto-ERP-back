//camada de validação e que lida com a camada de repository.
import { ClientesRepository } from "../repository/ClientesRepository";
import { HandlerError } from "../error/errorhandler.js";
const { deletar, criar, update, buscarUnico } = new ClientesRepository();
export class ServiceClient {
  static async create(body) {
    try {
      const { cliente } = await buscarUnico(body.cpf);
      if (!cliente) {
        //validação da regra de negócios
        const user = await criar(body);
        return user;
      } else {
        throw new HandlerError("usuário ja registrado no sistema", 400);
      }
    } catch (error) {
      throw error;
    }
  }

  static async buscar(cpf) {}
}
