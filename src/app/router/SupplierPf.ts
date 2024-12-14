import express, {Request, Response} from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { UploadFile } from "../utils/multer.js";
import multer from "multer";
import { func } from "joi";
import { SupplierPfMiddleware } from "../middleware/SupplierPfMiddleware.js";
const supplierPf = express.Router();

supplierPf.get("/", SupplierController.getAll);
supplierPf.get("/fisico", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById)
supplierPf.post("/arquivo", SupplierPfMiddleware.uploadFileSingle(), (req: Request, res: Response) => {
    res.status(200).json(req.file?.filename);
})
export default supplierPf;