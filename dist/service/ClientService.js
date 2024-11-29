import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Sharp } from "../utils/sharp.js";
export class ClientService {
    static async CreateClientService(body, image, order) {
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
    static async deleteClient(param) {
        try {
            console.log('oi');
            if (param && Number(param)) {
                console.log('peste');
                const company = await ClientRepository.GetuniqueClient(undefined, Number(param));
                console.log(company);
                if (!company) {
                    throw new AllError("Cliente/Empresa não cadastrada no sistema!", 404);
                }
                console.log(await ClientRepository.getImage(Number(param)));
            }
        }
        catch (error) {
        }
    }
}
