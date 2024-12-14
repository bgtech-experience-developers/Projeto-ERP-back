import { UploadFile } from "../utils/multer.js";
export class SupplierPfMiddleware {
    static uploadFileSingle(request, response, next) {
        try {
            UploadFile.uploadSingle().single("file");
            console.log(request.file);
            return;
        }
        catch (error) {
            next(error);
        }
    }
}
