import jwt, { Jwt } from "jsonwebtoken";
import { AdmRepository } from "../repository/AdmRepository.js";
import { AllError } from "../error/AllError.js";
import { JwtPayload } from "jsonwebtoken";
import { extend } from "joi";
type role = "adm" | "Regular";
export interface payload extends JwtPayload {
  id: number;
  permission: string[];
  cnpj: string;
  role: role;
}
export interface payloadEmail {
  idUser: number;
  email: string;
  timeExp: number;
  code: string;
}

export class JwtToken {
  static async getCodeToken<$Payload extends payload>(
    user: $Payload,

    secreteKey: role,
    time: jwt.SignOptions
  ): Promise<{ token: string; payload: jwt.JwtPayload | string }> {
    try {
      const secret =
        secreteKey === "adm"
          ? process.env.ADM_JWT_SECRET
          : process.env.ADM_JWT_REGULAR;
      if (secreteKey === "Regular") {
        const token = jwt.sign({ ...user, role: "Regular" }, secret!, time);
        const { payload } = jwt.verify(token, secret!, { complete: true });
        return { token, payload };
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            cnpj: user.cnpj,
            permission: [...user.permission],
            role: "adm",
          },
          secret!,
          time
        );
        const { payload } = jwt.verify(token, secret!, { complete: true });

        return { token, payload };
      }
    } catch (error) {
      throw error;
    }
  }
  static async validToken(token: string, secret: string) {
    try {
      jwt.verify(token, secret, (error) => {
        if (error) {
          throw new AllError("token inválido");
        }
        return "token válido ainda";
      });
    } catch (error) {
      throw error;
    }
  }
  static async tokenPayload(
    token: string,
    secretKey: string
  ): Promise<payloadEmail> {
    try {
      await this.validToken(token, secretKey);
      const { payload } = jwt.verify(token, secretKey, { complete: true });
      return payload as payloadEmail;
    } catch (error) {
      throw error;
    }
  }
  static TokenEmail(
    payload: {
      idUser: number;
      email: string;
      timeExp: number;
      code: string;
    },
    secretKey: string
  ) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  }
  static async RefreshToken<acess extends role = "adm" | "Regular">(
    payload: payload,
    acess: acess
  ) {
    try {
      const secretKeyAdm = process.env.ADM_JWT_SECRET;
      if (acess === "adm" && secretKeyAdm) {
        return jwt.sign(
          {
            id: payload.id,
            cnpj: payload.cnpj,
            permission: [...payload.permission],
            role: acess,
          },
          secretKeyAdm,
          {
            expiresIn: "7d",
          }
        );
      } else {
        const SecretKeyRegular =
          process.env.REGULAR_JWT_SECRET || "senharegular";
        return jwt.sign({ ...payload, role: "Regular" }, SecretKeyRegular, {
          expiresIn: "1d",
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static getTokenApi(
    payload: { app: "node-api" },
    secretKey: "api",
    time: jwt.SignOptions
  ): string {
    try {
      const secret = secretKey === "api" ? process.env.API_PHP_SECRET : null;
      if (!secret) {
        throw new AllError(
          "a chave secreta para assinatura do token para api não foi fornecida"
        );
      }
      return jwt.sign({ ...payload }, secret, time);
    } catch (error) {
      throw error;
    }
  }
}
