import { ClientService } from "../service/ClientService.js";
import { AllError } from "../error/AllError.js";
export class Client {
    static async CreateClient(request, response, next) {
        try {
            const clientCreate = request.body;
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
            const showClient = await ClientService.showClints();
            const { page, pageSized, value } = request.query;
            console.log(showClient);
            response.send(showClient);
        }
        catch (err) {
            next(err);
        }
    }
    async showClientById(request, response, next) {
        try {
            const { id } = request.params;
            const showOneClient = await ClientService.showClientById(id);
            response.status(200).json(showOneClient);
            return;
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
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
    static async updateClient(request, response, next) {
        try {
            const files = request.files;
            const order = request.body.imagens;
            const isActive = request.query.isActive ? false : true;
            const body = request.body;
            body["situation"] = isActive;
            console.log("a situação do cliente nesse exato momento é " + body.situation);
            const message = await ClientService.updateClient(body, order, files);
            console.log(message);
            response.status(201).json({ message });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteClient(request, response, next) {
        try {
            const { id } = request.params;
            await ClientService.deleteClient(id);
            response.status(200).json("Empresa/Cliente excluído com sucesso!");
        }
        catch (error) {
            next(error);
        }
    }
    static async showClientsFilter(request, response, next) {
        try {
            console.log("eu cheguei aqui");
            const query = request.query;
            if (query &&
                "status" in query &&
                "value" in query &&
                typeof query.value === "string") {
                const status = query.status === "true" ? true : false;
                const value = query.value;
                const result = await ClientService.filterCLient(status, value);
                response.status(200).json(result);
            }
            else {
                throw new AllError("a query string deve conter os campos de value e status");
            }
        }
        catch (error) {
            next(error);
        }
    }
}
