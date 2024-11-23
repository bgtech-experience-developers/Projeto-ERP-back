import { ClientService } from "../service/ClientService.js";
import { AllError } from "../../../error/AllError.js";
export class Client {
    static async CreateClient(request, response, next) {
        try {
            const clientCreate = request.body;
            const imagens = request.body.allImagens;
            const { mensagem } = await ClientService.CreateClientService(clientCreate, imagens);
            response.json(mensagem).status(201);
        }
        catch (error) {
            next(error); //a ideia de modularização de error, o next é útil nesse caso pois avisa pro express procurar um middleware que possua 4 parametros que trivialmente é associado ao middleware de erros que eu ja define
        }
    }
    static async getAllAddress(request, response, next) {
        try {
            const { id } = request.params;
            if (Number(id)) {
                const allAddress = await ClientService.getAllAddress(Number(id));
            }
            throw new AllError("soment numeros");
        }
        catch (error) {
            next(error);
        }
    }
}
