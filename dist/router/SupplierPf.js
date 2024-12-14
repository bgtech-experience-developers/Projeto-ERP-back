import express from "express";
import { SupplierController } from "../controller/SupplierController.js";
import { SupplierPfMiddleware } from "../middleware/SupplierPfMiddleware.js";
const supplierPf = express.Router();
supplierPf.get("/", SupplierController.getAll);
supplierPf.get("/fisico", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById);
supplierPf.post("/arquivo", SupplierPfMiddleware.uploadFileSingle(), (req, res) => {
    res.status(200).json(req.file?.filename);
});
export default supplierPf;
