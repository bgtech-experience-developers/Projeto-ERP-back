  import { NextFunction, Response, Request } from "express";
import jwt, { verify } from "jsonwebtoken";
import { AllError } from "../error/AllError.js";

export const authentication = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
      throw new AllError("token não fornecido");
    }
    const secret = process.env.ADM_JWT_SECRET;
    if (!secret) {
      throw new AllError("chave de assinatura não fornecida");
    }
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        throw new AllError("não autorizado", 403);
      }
      request.body.user = payload;
      console.log(payload);
    });
    next();
  } catch (error) {
    next(error);
  }
};
