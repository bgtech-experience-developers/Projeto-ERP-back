import { Request, Response } from 'express';
import ProductService from '../service/ProductService.js';

export default class ProductController {
  static async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const product = await ProductService.createProduct(data);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || 'Error creating product' });
    }
  }
}