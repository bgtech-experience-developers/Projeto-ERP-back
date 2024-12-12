import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AllError } from "../error/AllError.js";

export const GlobalError = (err: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
  console.log(err);

  err instanceof AllError ? response.status(err.status).json(err.message) : response.status(500).json("erro interno no servidor");
  return;
};
