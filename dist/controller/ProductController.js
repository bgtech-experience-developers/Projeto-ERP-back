import ProductService from "../service/ProductService.js";
export class ProductController {
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
    static async removeProduct(request, response, next) {
        try {
            const id = Number(request.params.id);
            const message = await ProductService.removeByIdProduct(id);
            response.status(201).json(message);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(request, response, next) {
        try {
            const productAll = await ProductService.getAll(request.query.take, request.query.skip);
            response.status(200).json(productAll);
            return;
        }
        catch (error) {
            next(error);
        }
    }
    static async countAll(request, response, next) {
        try {
            const countProduct = await ProductService.countAll();
            response.status(200).json(countProduct);
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
