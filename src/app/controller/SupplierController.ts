import { NextFunction } from "express";
import { SupplierService } from "../service/SupplierService.js";
import { Request, Response } from "express";

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
}