import express from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { SupplierPfMiddleware } from "../middleware/SupplierPfMiddleware.js";
const supplierPf = express.Router();
supplierPf.get("/", SupplierController.getAll);
supplierPf.get("/fisico", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById);
supplierPf.post("/arquivo", SupplierPfMiddleware.uploadFileSingle, SupplierPfMiddleware.handleFile, SupplierController.setSupplier);
export default supplierPf;
