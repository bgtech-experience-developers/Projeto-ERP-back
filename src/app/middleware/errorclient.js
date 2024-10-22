import { HandlerError } from "../error/errorhandler.js";

export const erroClient = (err, req, res, next) => {
  if (err instanceof HandlerError) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: `erro interno de servidor` });
};
