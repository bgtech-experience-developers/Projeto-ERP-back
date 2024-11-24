import { AdmService } from "../service/Adm.js";
export class AdmController {
    static async login(request, response, next) {
        try {
            const token = await AdmService.login(request.body);
            response.json("seu token gerado é " + token).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    static async createAdm(request, response, next) {
        try {
            const { permissions } = request.body;
            const body = request.body;
            const mensagem = AdmService.create(body, permissions);
            response.json({ mensagem }).status(201);
        }
        catch (error) {
            next(error);
        }
    }
}
