import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
export class ClientService {
    static async CreateClientService(body, imagens) {
        try {
            const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
            if (!cliente) {
                return ClientRepository.createCliente(body, imagens);
            }
            throw new AllError("cliente ja cadastrado no sistema");
        }
        catch (error) {
            throw error;
        }
    }
}
