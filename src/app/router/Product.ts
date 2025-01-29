import express from 'express';
import { ProductController } from '../controller/ProductController';
const product = express.Router();

// product.post('/', ProductController.createProduct);
product.get('/', ProductController.getAll);
product.get('/', ProductController.countAll);

export default product;