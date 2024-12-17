import { NextFunction, Request, Response } from "express";
import { SuppplierPjService } from "../service/SupplierPjService.js";
export type imageFile = Express.Multer.File | null;
export class SupplierControllerPj {
  static async setSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const profileImage: imageFile = request.body.image;
      const supplierCreationResult = await SuppplierPjService.setSupplier(
        request.body,
        profileImage
      );
      response.status(201).json(supplierCreationResult);
    } catch (error) {
      next(error);
    }
  }
  static async viewSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const query = request.query;
      const status = query.status ? (query.status as string) : null;
      const page = Number(query.page) ? Number(query.page) * 10 : 10;
      const limit = Number(query.limit) ? Number(query.limit) : 5;
      const allExistingRegister = await SuppplierPjService.getAll(
        limit,
        page,
        status
      );
    } catch (error) {
      next(error);
    }
  }
}
