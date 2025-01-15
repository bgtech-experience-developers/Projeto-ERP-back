import ProductService from '../service/ProductService.js';
export default class ProductController {
    static async createProduct(req, res) {
        try {
            const data = req.body;
            const product = await ProductService.createProduct(data);
            return res.status(201).json(product);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
