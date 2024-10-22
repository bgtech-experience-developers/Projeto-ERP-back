import { HandlerError } from "../error/errorhandler";

export const validadorClient = (req, res, next) => {
  try {
    const regex = / [./-/]gi/;
    let { cpf } = req.body;
    if (typeof cpf === `string`) {
      cpf = cpf.replace(regex, "").trim();
      if (!Number(cpf) || cpf.length != 11) {
        throw new HandlerError("cpf invalido", 400);
      } else {
        throw new HandlerError(`campo de cpf inválido`, 400);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
