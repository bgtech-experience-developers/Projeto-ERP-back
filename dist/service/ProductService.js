import ProductRepository from '../repository/ProductRepository.js';
export default class ProductService {
    static async createProduct(data) {
        try {
            // Implementar a ideia de validação de campos e também a sanitização deles. Dica: Usar o Joi para validar os campos e o regex para sanitizar.
            // Validar se o produto que está sendo cadastrado, já existe no banco, se exister, deve lançar uma exceção. 
            const product = await ProductRepository.createProduct(data);
            return product;
        }
        catch (error) {
            // Usar a classe de AllError. Quando quiser personalizar as mensagens
            throw new Error(`Error creating product: ${error}`);
        }
    }
}
