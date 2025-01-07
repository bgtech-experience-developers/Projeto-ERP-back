import express, {Request, Response} from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { UploadFile } from "../utils/multer.js";
import multer from "multer";
import { func } from "joi";
import { SupplierPfMiddleware } from "../middleware/SupplierPfMiddleware.js";
import { SupplierService } from "../service/SupplierService.js";
const supplierPf = express.Router();
supplierPf.get("/", SupplierController.getAll)
supplierPf.get("/status", SupplierController.getAllByStatus);
supplierPf.post("/", SupplierPfMiddleware.uploadFileSingle, SupplierPfMiddleware.handleFile, SupplierController.setSupplier);
supplierPf.get("/filtrar", SupplierController.getByFilter);
supplierPf.get("/:id", SupplierController.getById);
supplierPf.patch("/:id", SupplierPfMiddleware.uploadFileSingle, SupplierPfMiddleware.handleFile, SupplierController.updateSupplier);
supplierPf.delete("/:id", SupplierController.deleteSupplier);
export default supplierPf;