import express, { Request, Response } from "express";
export const clientRouter = express.Router();
clientRouter.get("/buscarCliente", (request: Request, response: Response) => {
  response.json("vai pra academia mano");
});
