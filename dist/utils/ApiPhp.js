import { AllError } from "../error/AllError.js";
import { ApiPhp } from "../middleware/ApiPhp.js";
export const ApiPhpUtils = async (imagems, typeFolder, files) => {
    try {
        const filesPath = imagems.filter((path) => {
            return path ? path : false;
        });
        if (filesPath.length != 0) {
            let controle = 0;
            const allPaths = await ApiPhp({
                filePath: [...filesPath],
                typeFolder,
                files,
                action: 'upload'
            });
            if (allPaths instanceof Array) {
                imagems.forEach((value, index) => {
                    value ? ((imagems[index] = allPaths[controle].url), controle++) : "";
                });
            }
            else {
                throw new AllError(allPaths.message, 403);
            }
        }
        return imagems;
    }
    catch (error) {
        throw error;
    }
};
