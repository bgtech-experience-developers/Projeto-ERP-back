import { ClientRepository } from "../repository/clientRepository.js";
const { showCLients } = new ClientRepository;
export class Client {
    static async CreateClient(request, response, next) {
        try {
            const clientCreate = request.body;
            const imagens = request.body.allImagens;
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
        }
    }
}
