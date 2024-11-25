import { AllError } from "../error/AllError.js";
export const GlobalError = (err, request, response, next) => {
    if (err instanceof AllError) {
        console.log(err.status);
        response.status(err.status).json(err.message);
    }
    else {
        response.json("erro interno do servidor").status(500);
    }
};
