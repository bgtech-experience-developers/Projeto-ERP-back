import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AllError } from "../error/AllError.js";

export const GlobalError = (
  err: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  err instanceof AllError
    ? response.json(err.message).status(err.status)
    : response.json("erro interno do servidor").status(500);
  return;
};
