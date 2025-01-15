import ProductRepository from '../repository/ProductRepository.js';

export default class ProductService {
  static async createProduct(data: any) {
    try {
      const product = await ProductRepository.createProduct(data);
      return product;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }
}