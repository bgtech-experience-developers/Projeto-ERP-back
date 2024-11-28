import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { UploadCloudnary } from "../utils/cloudinary.js";
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
            Sharp.removeImagens(image);
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
    static async showClints() {
        try {
            const allClints = await ClientRepository.showCLients();
            const newArray = allClints.map(({ branch_activity, situation, fantasy_name, owner_partner }) => {
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
            });
            return newArray;
        }
        catch (error) {
            throw error;
        }
    }
}
