import { AdmService } from "../service/Adm.js";
import { AllError } from "../error/AllError.js";
export class AdmController {
    static async accessRenew(request, response, next) {
        try {
            const newPassword = request.body;
            const tokenUser = request.headers.tokenrecieve;
            const token = tokenUser && tokenUser.split(" ")[1];
            console.log(tokenUser);
            const message = await AdmService.accessRenew(newPassword, token);
            response.status(201).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    static async receiveCode(request, response, next) {
        try {
            const tokenRecieve = request.headers.tokenrecieve;
            console.log(tokenRecieve);
            const token = tokenRecieve && tokenRecieve.split(" ")[1];
            console.log(token);
            if (!token) {
                throw new AllError("token de verificação não fornecido");
            }
            const code = request.body.code;
            const result = await AdmService.receiveCode(token, code);
            response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    static async sendEmailCode(request, response, next) {
        try {
            const email = request.body.email;
            const resultToken = await AdmService.sendEmailCode(email);
            response.json(resultToken);
        }
        catch (error) {
            next(error);
        }
    }
    static async login(request, response, next) {
        try {
            const { token, refreshToken } = await AdmService.login(request.body);
            response.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 24 * 60 * 60 * 7000,
                sameSite: "none",
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
