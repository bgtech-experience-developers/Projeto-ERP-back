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
            const adm = await AdmService.getAll(request.query);
            return response.json({
                adm,
                message: `Na page ${request.query.page} foi gerado mais 4 registros.`
            }).status(200);
        }
        catch (error) {
            next(error);
        }
    }
}
export default new Adm;
