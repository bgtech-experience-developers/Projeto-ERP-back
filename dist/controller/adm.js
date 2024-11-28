import { AdmService } from "../service/Adm.js";
export class AdmController {
    static async login(request, response, next) {
        try {
            const { token, refreshToken } = await AdmService.login(request.body);
            response.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 7000,
                sameSite: "none", // validade do token , equivale a 7 dias
            });
            response.json({ token, refreshToken }).status(200);
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
            response
                .json({
                adm,
                message: `Na page ${request.body.page} foi gerado mais 4 registros.`,
            })
                .status(200);
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
