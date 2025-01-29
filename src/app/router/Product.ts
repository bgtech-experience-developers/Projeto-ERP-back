import express from 'express';
import { ProductController } from '../controller/ProductController';
const product = express.Router();

// product.post('/', ProductController.createProduct);
product.get('/count', ProductController.countAll);
product.get('/', ProductController.getAll);

export default product;