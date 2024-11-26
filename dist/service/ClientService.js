import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { DeleteResourcesCloud, UploadCloudnary } from "../utils/cloudinary.js";
import { Sharp } from "../utils/sharp.js";
export class ClientService {
    static async CreateClientService(body, image, order) {
        try {
            const cliente = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
            if (!cliente) {
                const uploadCloud = await UploadCloudnary(image);
                const { error, mensagem } = await Sharp.removeImagens(image);
                if (error) {
                    throw new AllError(mensagem);
                }
                console.log("eu passo por aqui papai");
                const imagens = Sharp.allImagens(uploadCloud, order);
                return ClientRepository.createCliente(body, imagens);
            }
            await Sharp.removeImagens(image);
            throw new AllError("cliente ja cadastrado no sistema");
        }
        catch (error) {
            throw error;
        }
    }
    static async getAllAddress(id) {
        try {
            const client = await ClientRepository.GetuniqueClient(null, id);
            if (client) {
                return await ClientRepository.GetAllAddress(client.id);
            }
            throw new AllError("client não existe", 400);
        }
        catch (error) {
            throw error;
        }
    }
    static async updateClient(order, body, image) {
        try {
            const client = await ClientRepository.GetuniqueClient(body.cliente.cnpj);
            if (client) {
                const regex = /[\b.png\b.jpg/]/gi;
                const imagens = image.map((imagem) => {
                    return `erp/${imagem.originalname.replace(regex, "")}`;
                });
                const result = await DeleteResourcesCloud([...imagens]);
                const error = imagens.filter((string) => result.deleted[string] === "not found");
                if (error.length != 0) {
                    throw new AllError("não foi possivel deletar a imagem no serviço da nuvem");
                }
                await Sharp.removeImagens(image);
            }
            throw new AllError("empresa não encontrada no sistema");
        }
        catch (error) {
            throw error;
        }
    }
}
