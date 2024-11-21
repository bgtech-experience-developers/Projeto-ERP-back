import { AllError } from "../error/AllError.js";
export const imagens = (request, response, next) => {
    try {
        const imagens = request.body.imagens;
        const allImage = imagens.map((boolean, index) => {
            if (!boolean) {
                //caso seja false vai ser tornar true
                return null;
            }
            else {
                if (request.files instanceof Array) {
                    const files = request.files;
                    const file = files[index];
                    return file.filename;
                }
                throw new AllError("arquivo não compativel", 505);
            }
        });
        request.body = allImage;
        next();
    }
    catch (error) {
        next(error);
    }
};
