import ProductRepository from "../repository/ProductRepository.js";
import { AllError } from "../error/AllError.js";

export default class ProductService {
  static async removeByIdProduct(id: number) {
    try {
      const productUnique = await ProductRepository.getUniqueProduct(id);
    } catch (error) {
      throw error;
    }
  }
  static async createProduct(data: any) {
    try {
      // Implementar a ideia de validação de campos e também a sanitização deles. Dica: Usar o Joi para validar os campos e o regex para sanitizar.
      // Validar se o produto que está sendo cadastrado, já existe no banco, se exister, deve lançar uma exceção.
      const product = await ProductRepository.createProduct(data);
      return product;
    } catch (error) {
      // Usar a classe de AllError. Quando quiser personalizar as mensagens
      throw new Error(`Error creating product: ${error}`);
    }
  }

  static async getAll(take: string | number, skip: string | number) {
    try {
      take = Number(take) ? (take as number) : (take = 10);
      skip = Number(skip) ? (skip as number) : (skip = 1);

      skip = (skip - 1) * take;

      return await ProductRepository.getAll(take, skip);
    } catch (error) {
      throw error;
    }
  }

  static async countAll(): Promise<number> {
    try {
      return await ProductRepository.countAll();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string | number) {
    try {
        const productId = Number(id);
        
        if (!productId || isNaN(productId)) {
            throw new AllError('ID do produto inválido', 400);
        }

        const product = await ProductRepository.getById(productId);
        
        if (!product) {
            throw new AllError('Produto não encontrado', 404);
        }

        return product;
    } catch(error) {
        if (error instanceof AllError) {
            throw error;
        }
        throw new AllError(`Erro ao buscar produto: ${error}`, 500);
    }
  }

}
