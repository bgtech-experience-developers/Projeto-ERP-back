import { NextFunction, Request, Response } from "express";
import { AllError } from "../error/AllError.js";

export const hasPermission = <permission extends string>(
  hasPermission: permission
): ((request: Request, response: Response, next: NextFunction) => void) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const permissions: string[] = request.body.user.permission;

      const permission = permissions.includes(hasPermission);
      if (permission) {
        next();
        return;
      }

      throw new AllError("usuário não tem permissão para essa ação");
    } catch (error) {
      next(error);
    }
  };
};
