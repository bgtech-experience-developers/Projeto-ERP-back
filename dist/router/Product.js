import { Router } from 'express';
import ProductController from '../controller/ProductController.js';
const router = Router();
router.post('/', ProductController.createProduct);
export default router;
