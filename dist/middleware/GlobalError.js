import { AllError } from "../error/AllError.js";
export const GlobalError = (err, request, response, next) => {
    err instanceof AllError
        ? response.status(err.status).json(err.message)
        : response.json("erro interno no servidor").status(500);
    return;
};
