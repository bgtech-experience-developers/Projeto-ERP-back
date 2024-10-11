import { NotFound } from "../err/clientError.js";

export const Admin = (request, response, next) => {
  const admin = request.headers["admin"];

  try {
    console.log(process.env.SENHA_ADMIN);
    if (process.env.SENHA_ADMIN != admin) {
      throw new NotFound(
        "acesso negado, somente pessoas com autorização tem acesso a essa rota",
        403
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
