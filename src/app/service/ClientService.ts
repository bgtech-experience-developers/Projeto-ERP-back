import { ClientCreate } from "../controller/client.js";
import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Files } from "../middleware/ClientValidator.js";
export class ClientService {
  static async CreateClientService(
    body: ClientCreate,
    imagens: Files[]
  ): Promise<{ mensagem: string }> {
    try {
      const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
      if (!cliente) {
        return ClientRepository.createCliente(body, imagens);
      }
      throw new AllError("cliente ja cadastrado no sistema");
    } catch (error) {
      throw error;
    }
  }
}
