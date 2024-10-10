import { Exist, NotFound } from "../err/clientError.js";
export const erroCLient = (error, requisição, resposta, proxima) => {
  if (error instanceof Exist || error instanceof NotFound) {
    resposta.status(error.status).json(error.message);
    return;
  }
  resposta.status(500).json("erro interno no servidor");
};
