import { AdmService } from "../service/Adm.js";
export class Adm {
    async login(request, response, next) {
        try {
            const token = await AdmService.login(request.body);
            response.json("seu token gerado é " + token).status(200);
        }
        catch (error) {
            next(error);
        }
    }
}
