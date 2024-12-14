import express from "express";
import { SupplierController } from "../controller/SupplierController.js";
import multer from "multer";
const supplierPf = express.Router();
// Configurando o armazenamento no servidor
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });
supplierPf.get("/", SupplierController.getAll);
supplierPf.get("/:id", SupplierController.getById);
supplierPf.post("/arquivo", upload.single("file"), (req, res) => {
    res.status(200).json(req.file?.filename);
});
export default supplierPf;
