import express from "express";
import { SupplierController } from "../controller/SupplierController.js";

const supplierPf = express.Router();

supplierPf.get("/", SupplierController.getAll)

export default supplierPf;