import multer from "multer";
import { Request,Response, NextFunction } from "express";
import { UploadFile } from "../utils/multer.js";
import { log } from "node:console";

export class SupplierPfMiddleware {
    
    static uploadFileSingle(request: Request, response: Response, next: NextFunction) {
        try {
            UploadFile.uploadSingle().single("file");
            console.log(request.file);
            return
        } catch(error) {
            next(error);
        }

    } 
}