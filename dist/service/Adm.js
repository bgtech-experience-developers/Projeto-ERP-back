import { AllError } from "../error/AllError.js";
import { AdmRepository } from "../repository/AdmRepository.js";
import { BycriptCripto } from "../utils/bcrypt.js";
import { JwtToken } from "../utils/Jwt.js";
import { ServerSmtpConnection } from "../utils/sendEmail.js";
export class AdmService {
    static async login(body) {
        try {
            const admRegister = await AdmRepository.getUnique(body.cnpj);
            if (!admRegister) {
                throw new AllError("usuário não encontrado no sistema", 400);
            }
            if (!(admRegister instanceof Array)) {
                const passwordEqual = BycriptCripto.comparePassword(body.password, admRegister.password);
                console.log(passwordEqual);
                if (passwordEqual && process.env.ADM_JWT_SECRET) {
                    console.log(process.env.ADM_JWT_SECRET);
                    const [clientWithPermisions] = (await AdmRepository.getUnique(undefined, admRegister.id, true));
                    const permission = clientWithPermisions.role_adm?.map(({ role }) => {
                        return role.role_name;
                    });
                    const payloadAdm = {
                        permission,
                        id: clientWithPermisions.id,
                        cnpj: clientWithPermisions.cnpj,
                    };
                    const { token, payload } = await JwtToken.getCodeToken(payloadAdm, "adm", { expiresIn: "15min" });
                    const { role } = payload;
                    const refreshToken = await JwtToken.RefreshToken(payload, role);
                    return { token, refreshToken };
                }
                throw new AllError("dados incorretos");
            }
            throw new AllError("erro interno");
        }
        catch (error) {
            throw error;
        }
    }
    static getRandomCode() {
        return Array.from({ length: 6 }, () => "0123456789"[Math.floor(Math.random() * 11)]).join("");
    }
    static getBodyEmail(recevierEmail, code) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: recevierEmail,
                subject: `${code} é o seu código de verificação`,
                html: `<html>
          <head></head>
           <body style="background-color: #1b2b0e">
            <h1 style="color: #382f32">Olá</h1>
            <p
              style="
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: white;
                text-transform: capitalize;
              "
            >
              Use o código informado nesse email para se autenticar assim sendo possível
              uma alteração de senha realizada por você
            </p>
            <div>
              <h2
                style="font-weight: 700; color: whitesmoke; text-transform: capitalize"
              >
                este código é unico
              </h2>
              <p style="text-transform: capitalize">
                não vamos te ligar pra pedir este código ou enviar mensagens por outros
                meios, como SMS ou WhatsApp
              </p>
              <div>
                <h3 style="text-transform: capitalize">
                  não envie esse código pra ninguém
                </h3>
                <p style="text-transform: capitalize">
                  para sua seguança, não envie esse código para ninguém
                </p>
                <div
                  style="
                    background-color: #382f32;
                    font-size: 30px;
                    text-align: center;
                    border-radius: 5px;
                    letter-spacing: 20px;
                    color: #7c5b5c;
                    font-weight: 800;
                  "
                >
                 ${code}
                </div>
                <p style="font-size: 12px; text-transform: capitalize">
                  esse código é válido por
                  <span style="font-weight: 700"> 10 minutos </span>,contados a partir
                  do recebimento deste e-mail.
                </p>
                <div
                  style="
                    background-color: #337249;
                    border-radius: 5px;
                    padding: 5px;
                    text-align: center;
                  "
                >
                  <a
                    href="https://youtu.be/SC4xMk98Pdc?si=CVEtvknxJVxk6h-i"
                    style="text-decoration: none; color: white"
                    >Entrar</a
                  >
                </div>
              </div>
            </div>
          </body>
        </html>`,
            };
            return mailOptions;
        }
        catch (error) {
            throw error;
        }
    }
    static async accessRenew(newPassword, tokenUser) {
        try {
            const newHashp = BycriptCripto.createPassword(newPassword, 10);
            const payloadUser = await this.getTokenPayload(tokenUser, process.env.SEND_EMAIL ? process.env.SEND_EMAIL : "");
            const message = await AdmRepository.resetPassword(payloadUser.idUser, newHashp);
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    static async verifyError(bodyemail) {
        try {
            const sendEmail = ServerSmtpConnection.serverSmtp();
            await new Promise((resolve, reject) => {
                sendEmail.sendMail(bodyemail, (error, info) => {
                    if (error) {
                        reject(new AllError("email não enviado"));
                    }
                    else {
                        resolve(info);
                    }
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async getTokenEmail(recevierEmail, idUser) {
        try {
            const code = this.getRandomCode();
            const bodyEmail = this.getBodyEmail(recevierEmail, code);
            await this.verifyError(bodyEmail);
            const timeExp = Date.now();
            return {
                token: JwtToken.TokenEmail({ email: recevierEmail, timeExp, code, idUser }, process.env.SEND_EMAIL ? process.env.SEND_EMAIL : ""),
                code,
            };
        }
        catch (error) {
            throw error;
        }
    }
    static async clearTemporaryToken(id) {
        return AdmRepository.clearTemporaryToken(id);
    }
    static async sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    static async sendEmailCode(email, resend) {
        try {
            const userExist = await AdmRepository.getUniqueByEmail(email);
            if (!userExist) {
                throw new AllError("este email não está vinculado a nenhum administrador");
            }
            resend ? await this.clearTemporaryToken(userExist.adm_id) : "";
            const { token, code } = await this.getTokenEmail(email, userExist.adm_id);
            const tokenHash = BycriptCripto.createPassword(token, 10);
            await AdmRepository.storageTemporaryToken(tokenHash, userExist.adm_id, code);
            return token;
        }
        catch (error) {
            throw error;
        }
    }
    static getTokenPayload(token, secret) {
        try {
            return JwtToken.tokenPayload(token, secret);
        }
        catch (error) {
            throw error;
        }
    }
    static async receiveCode(token, codeRecieve) {
        try {
            const tokenPayload = await this.getTokenPayload(token, process.env.SEND_EMAIL ? process.env.SEND_EMAIL : "");
            const [tokenUserStorage] = (await AdmRepository.getTokenTemporary(tokenPayload.code, tokenPayload.idUser));
            const tokenUser = tokenUserStorage.token;
            console.log(tokenUser);
            console.log(BycriptCripto.comparePassword(token, tokenUser));
            if (!tokenUser || !BycriptCripto.comparePassword(token, tokenUser)) {
                throw new AllError("solicite outro código");
            }
            await this.verifyCode({ codeRecieve, codeStorage: tokenPayload.code }, tokenPayload.timeExp);
            return token;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async verifyCode({ codeRecieve, codeStorage, }, timeExp) {
        try {
            console.log(Date.now());
            if (codeRecieve != codeStorage) {
                throw new AllError("código inválido", 401);
            }
            else if ((Date.now() - timeExp) / 1000 >= 600) {
                throw new AllError("código expirado, solicite outro", 403);
            }
            return "acesso permitido";
        }
        catch (error) {
            throw error;
        }
    }
    static async create({ cnpj, password, email }, permission) {
        try {
            const security = 10;
            const admRegister = await AdmRepository.getUnique(cnpj);
            console.log(admRegister);
            if (admRegister) {
                throw new AllError("administrador ja cadastrado no sistema");
            }
            const senhaHash = BycriptCripto.createPassword(password, security);
            password = senhaHash;
            return await AdmRepository.create({ cnpj, password, email }, permission);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        // const admRegister = await
    }
    static async getAll(query) {
        try {
            return await AdmRepository.getAll(Number(query.page));
        }
        catch (error) {
            throw error;
        }
    }
}
