import { ClientCreate } from "../controller/client.js";
import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Files } from "../middleware/ClientValidator.js";
import { UploadCloudnary } from "../utils/cloudinary.js";
import { Sharp } from "../utils/sharp.js";
import { ApiPhp } from "../middleware/ApiPhp.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
export class ClientService {
  static async CreateClientService(
    body: ClientCreate,
    image: Express.Multer.File[],
    order: boolean[]
  ): Promise<{ mensagem: string }> {
    try {
      const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
      if (!cliente) {
        // const { error, mensagem } = await Sharp.removeImagens(image);
        // if (error) {
        //   throw new AllError(mensagem);
        // }

        const imagens = Sharp.allImagens(image, order);

        // const apiPhp = await ApiPhpUtils(imagens);

        // const { error, mensagem } = await Sharp.removeImagens(image);
        // if (error) {
        //   throw new AllError(mensagem);
        // }
        return ClientRepository.createCliente(body, imagens, image); // ja to enviando de forma aliada o caminho da imagens e os camops null de qum não enviou
      }
      Sharp.removeImagens(image);
      throw new AllError("cliente ja cadastrado no sistema");
    } catch (error) {
      throw error;
    }
  }
  static async getAllAddress(id: number) {
    try {
      const client = await ClientRepository.GetuniqueClient<null>(null, id);
      if (client) {
        return await ClientRepository.GetAllAddress(client.id);
      }
      throw new AllError("client não existe", 400);
    } catch (error) {
      throw error;
    }
  }
  static async showClints() {
    try {
      const allClints = await ClientRepository.showCLients();
      const newArray = allClints.map(
        ({ branch_activity, situation, fantasy_name, owner_partner }) => {
          return {
            branch_activity,
            situation,
            fantasy_name,
            name: [
              ...owner_partner.map(({ sector }) => {
                return sector.name;
              }),
            ],
            email: [
              ...owner_partner.map(({ sector }) => {
                return sector.email;
              }),
            ],
            telefone: [
              ...owner_partner.map(({ sector }) => {
                return sector.cell_phone;
              }),
            ],
          };
        }
      );
      return newArray;
    } catch (error) {
      throw error;
    }
  }
}
