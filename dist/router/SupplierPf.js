import express from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { SupplierPfMiddleware } from "../middleware/SupplierPfMiddleware.js";
const supplierPf = express.Router();
supplierPf.get("/", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById);
supplierPf.post("/", SupplierPfMiddleware.uploadFileSingle, SupplierPfMiddleware.handleFile, SupplierController.setSupplier);
supplierPf.delete("/:id", SupplierController.deleteSupplier);
export default supplierPf;
