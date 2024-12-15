import multer from "multer";
import { Request,Response, NextFunction } from "express";
import { UploadFile } from "../utils/multer.js";
import { log } from "node:console";
import { AllError } from "../error/AllError.js";

export class SupplierPfMiddleware {
    static uploadFileSingle = UploadFile.uploadSingle().single("photo")

    static handleFile(request: Request<any, any, BodySupplierPf>, response: Response, next: NextFunction) {
        try {
            console.log(request.file);

            if(!request.body || !request.body.json) {
                throw new AllError("Campo json ausente na requisição")
            }

            request.body = JSON.parse(request.body.json);
            console.log(request.body);

            request.body.address.cep =  request.body.address.cep?.replace( /\D/g, "")
            request.body.supplier.supplier_code = request.body.supplier.supplier_code?.replace( /\D/g, "")
            request.body.supplier.rg = request.body.supplier.rg?.replace( /\D/g, "")
            request.body.supplier.cpf = request.body.supplier.cpf?.replace( /\D/g, "")
            request.body.supplier.phone = request.body.supplier.phone?.replace(/\D/g, "")
            request.body.supplier.cell_phone = request.body.supplier.cell_phone?.replace(/\D/g, "")
            console.log(request.body);

            next()
        } catch(error) {
            next(error);
        }

    }  
}