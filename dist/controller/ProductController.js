import ProductService from '../service/ProductService.js';
export default class ProductController {
    static async createProduct(req, res) {
        try {
            const data = req.body;
            const product = await ProductService.createProduct(data);
            return res.status(201).json(product);
        }
        catch (error) {
            return res.status(500).json({ message: error.message || 'Error creating product' });
        }
    }
    static async getAll(request, responde, next) {
        try {
            const productAll = await ProductService.getAll(request.query.take, request.query.skip);
            return responde.status(200).json(productAll);
        }
        catch (error) {
            next(error);
        }
    }
}
