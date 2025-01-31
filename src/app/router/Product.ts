import express from "express";
import { ProductController } from "../controller/ProductController.js";
import { authentication } from "../middleware/authTentication.js";
import { hasPermission } from "../middleware/permission.js";
const product = express.Router();

// product.post('/', ProductController.createProduct);
product.get("/count", ProductController.countAll);
product.get("/", ProductController.getAll);
product.delete(
  "/remover/:id",
  authentication,
  hasPermission("remover"),
  ProductController.removeProduct
);

export default product;
