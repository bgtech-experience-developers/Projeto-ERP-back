import { AllError } from "../error/AllError.js";
export const GlobalError = (err, request, response, next) => {
    console.log(err);
    err instanceof AllError ? response.status(err.status).json(err.message) : response.status(500).json("erro interno no servidor");
    return;
};
