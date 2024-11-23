
import { ClientRepository } from "../repository/clientRepository.js";
const { showCLients } = new ClientRepository;

import { ClientService } from "../service/ClientService.js";
import { AllError } from "../error/AllError.js";

export class Client {
    static async CreateClient(request, response, next) {
        try {
            const clientCreate = request.body;

            const imagens = request.body.allImagens;

            const imagens = request.files;
            const order = request.body.imagens;
            const { mensagem } = await ClientService.CreateClientService(clientCreate, imagens, order);
            response.json(mensagem).status(201);

        }
        catch (error) {
            next(error); //a ideia de modularização de error, o next é útil nesse caso pois avisa pro express procurar um middleware que possua 4 parametros que trivialmente é associado ao middleware de erros que eu ja define
        }
    }

    async showClients(request, response, next) {
        try {
            const showClient = await showCLients();
            response.send(showClient);
        }
        catch (err) {
            console.log(err);
            response.status(500).json({ message: 'erro interno do servidor! :(' });
            next(err);

    static async getAllAddress(request, response, next) {
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
        }
        catch (error) {
            next(error);

        }
    }
}
