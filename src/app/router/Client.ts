import express, { Request, Response, urlencoded } from "express";

export const clientRouter = express.Router();
clientRouter.get("/buscarCliente", (request: Request, response: Response) => {
  response.json("vai pra academia mano");
});
