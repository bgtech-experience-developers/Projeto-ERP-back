import express from "express";
import { SupplierController } from "../controller/SupplierController.js";

const supplierPf = express.Router();

supplierPf.get("/fisico", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById)

export default supplierPf;