import { AllError } from "../error/AllError.js";
import { ClientRepository } from "../repository/clientRepository.js";
import { Sharp } from "../utils/sharp.js";
import { deleteApiPhp } from "../middleware/ApiPhp.js";
const paths = [];
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
            const paths = [];
            if (param && Number(param)) {
                const company = await ClientRepository.GetuniqueClient(undefined, Number(param));
                // console.log(company);1
                if (!company) {
                    throw new AllError("Cliente/Empresa não cadastrada no sistema!", 404);
                }
                const pathImages = await ClientRepository.getImage(Number(param));
                // console.log(pathImages);
                paths.push(pathImages?.image_company[0].image.path);
                paths.push(pathImages?.owner_partner[0].sector.owner_partner_image[0].image.path);
                paths.push(pathImages?.commercial_contact[0].sector.commercial_image[0].image.path);
                paths.push(pathImages?.accounting_contact[0].sector.accounting_contact_image[0].image.path);
                paths.push(pathImages?.financinal_contact[0].sector.financial_image[0].image.path);
                const pathsAll = paths.filter((path) => path != null || undefined);
                const newPath = pathsAll.map((path) => {
                    const paths = path?.replace("https://bgtech.com.br/erp/assets/", "");
                    return paths ? paths : null;
                });
                console.log(newPath);
                deleteApiPhp(newPath);
                const deleteClient = await ClientRepository.deleteClient(Number(param));
                console.log(deleteClient);
                return deleteClient;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
