import express from "express";
import { ProductController } from "../controller/ProductController";
const product = express.Router();

// product.post('/', ProductController.createProduct);
product.get("/count", ProductController.countAll);
product.get("/", ProductController.getAll);
product.delete("/remover/:id", ProductController.removeProduct);
product.get('/:id', ProductController.getById);

export default product;
