import { NextFunction, Request, Response } from "express";
import { SuppplierPjService } from "../service/SupplierPjService.js";
import { SupplierService } from "../service/SupplierService.js";
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
      response.status(200).json(allExistingRegister);
    } catch (error) {
      next(error);
    }
  }
  static async getByIdSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.body;
      const registerSupplier = await SuppplierPjService.getByIdSupplier(id);
      response.status(200).json(registerSupplier);
    } catch (error) {
      next(error);
    }
  }
  static async removeByIdSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { id } = request.body;
      const message = await SuppplierPjService.removeByIdSupplier(id);
      response.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
  static async updateSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const profileImage: imageFile = request.body.image;
      const { id } = request.body;
      const updateSupplierRegister = await SuppplierPjService.updateSupplier(
        request.body,
        profileImage,
        id
      );
      response.status(200).json(updateSupplierRegister);
    } catch (error) {
      next(error);
    }
  }
  static async FilterSupplier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const query = request.query;
      const status = query.status ? (query.status as string) : null;
      const value = typeof query.value === "string" ? query.value : "";
      const page = Number(query.page) ? Number(query.page) * 10 : 10;
      const limit = Number(query.limit) ? Number(query.limit) : 5;
      const allExistingRegister = await SuppplierPjService.filterSupplier(
        page,
        limit,
        status,
        value
      );
      response.status(200).json(allExistingRegister);
    } catch (error) {
      throw error;
    }
  }
}
