import { NextFunction, Request, Response } from 'express';
import ProductService from '../service/ProductService.js';

export  class ProductController {
  // static async createProduct(req: Request, res: Response) {
  //   try {
  //     const data = req.body;
  //     const product = await ProductService.createProduct(data);
  //     return res.status(201).json(product);
  //   } catch (error: any) {
  //     // return 
  //     res.status(500).json({ message: error.message || 'Error creating product' });

      
  //   }
  // }

  static async getAll(request: Request<any, any, any, {take: string, skip: string}>, response: Response, next: NextFunction) {
    try {
      const productAll = await ProductService.getAll(request.query.take, request.query.skip);
      response.status(200).json(productAll);
      return
    } catch(error) {
        next(error)
    }
  }

  static async countAll(request: Request, response: Response, next: NextFunction) {
    try {
      const countProduct = await ProductService.countAll();
      response.status(200).json(countProduct);
      return
    } catch(error) {
        next(error);
    }
  }

  static async getSuppliersProducts(request: Request<any, any, any, {name: string}>, response: Response, next: NextFunction) {
    try {
      const filter = await ProductService.getSuppliersProducts(request.query.name);
      response.status(200).json(filter);
      return;
    } catch(error) {
      next(error);
    }
  }
}