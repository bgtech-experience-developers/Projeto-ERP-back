import { AllError } from "../error/AllError.js";
export const GlobalError = (err, request, response, next) => {
    err instanceof AllError
        ? response.json(err.message).status(err.status)
        : response.json("erro interno do servidor").status(500);
    return;
};
