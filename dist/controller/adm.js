import { AdmService } from "../service/Adm.js";

class Adm {
    async login(request, response, next) {

        try {
            const token = await AdmService.login(request.body);
            return response.json("seu token gerado é " + token).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(request, response, next) {
        try {
            const adm = await AdmService.getAll(request.body);
            return response.json({
                adm,
                message: `Na page ${request.body.page} foi gerado mais 4 registros.`
            }).status(200);
        }
        catch (error) {
            next(error);
        }
    }
    static async createAdm(request, response, next) {
        try {
            const { permissions } = request.body;
            const body = request.body;
            const mensagem = await AdmService.create(body, permissions);
            response.json({ mensagem }).status(201);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateAdm() { }
}
export default new Adm;
