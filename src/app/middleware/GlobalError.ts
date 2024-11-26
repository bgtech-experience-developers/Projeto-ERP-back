import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AllError } from "../error/AllError.js";

export const GlobalError = (
  err: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  err instanceof AllError
    ? response.status(err.status).json(err.message)
    : response.json("erro interno no servidor").status(500);
  return;
};
