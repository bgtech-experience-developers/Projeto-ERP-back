import { AdmService } from "../service/Adm.js";
export class AdmController {
    static async login(request, response, next) {
        try {
            const token = await AdmService.login(request.body);
            response.json("seu token gerado é " + token).status(200);
            return;
        }
        catch (error) {
            next(error);
        }
    }
    static async createAdm(request, response, next) {
        try {
            const { permissions } = request.body;
            console.log(permissions);
            const body = request.body;
            console.log(body);
            const mensagem = await AdmService.create(body, permissions);
            response.json({ mensagem }).status(201);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateAdm() { }
    static async getAll(request, response, next) {
        try {
            const adm = await AdmService.getAll(request.query);
            response.json({
                adm,
                message: `Na page ${request.query.page} foi gerado mais 4 registros.`
            }).status(200);
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
