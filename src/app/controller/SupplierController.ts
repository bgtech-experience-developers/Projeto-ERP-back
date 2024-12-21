import { NextFunction } from "express";
import { SupplierService } from "../service/SupplierService.js";
import { Request, Response } from "express";
import { log } from "node:console";

export class SupplierController {
    // <AllSupplier_pf[] | null>
    static async getAll(request: Request<any, any, any, {page: string}>, response: Response, next: NextFunction) {
        try {
            // const AllSupplier: AllSupplier_pf[] | null = await SupplierService.getAll(request.query.page)
            const allSuppliers = await SupplierService.getAll(request.query.page)
            response.status(200).json(allSuppliers)
            return
        } catch (error) {
            next(error)
        }


    }

    static async getById(request: Request<{id: string}>, response: Response, next: NextFunction) {
        try {
            const supplier = await SupplierService.getById(request.params.id)
            response.status(200).json(supplier)
            return

        } catch(error) {
            next(error)
        }     
    }

    static async setSupplier(request: Request, response: Response, next: NextFunction) {
        try {
            const image = request.file as Express.Multer.File
            await SupplierService.setSupplier(request.body, image)
            response.status(201).json("Fornecedor cadastrado com sucesso")
            return
        }  catch(error) {
            next(error);
        }

    }

    static async deleteSupplier(request: Request<{id: string}>, response: Response, next: NextFunction) {
        try {
            await SupplierService.deleteSupplier(request.params.id);
            response.status(200).json("Fornecedor excluído com sucesso!");
            return
        } catch(error) {
            next(error);
        }
    }

    static async updateSupplier(request: Request<{id: string}>, response: Response, next: NextFunction) {
        try {
            const image = request.file as Express.Multer.File;   
            await SupplierService.updateSupplier(request.body, image, request.params.id);
            response.status(200).json("Fornecedor Atualizado com sucesso!");
            return
        } catch(error) {
            next(error);
        }

    }
}