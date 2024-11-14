import express from "express";
export const clientRouter = express.Router();
clientRouter.get("/buscarCliente", (request, response) => {
    response.json("vai pra academia mano");
});
