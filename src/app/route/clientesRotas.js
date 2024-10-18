import express from "express";
import { ClienteController } from "../controller/clientesController.js";

const rotaCliente = express.Router();

const { criar, mostrar, deletar, buscarUnico, update } =
  new ClienteController();

rotaCliente.post("/cadastrar", criar);
rotaCliente.get("/todos-clientes", mostrar);
rotaCliente.delete("/deletar/:cpf", deletar);
rotaCliente.get("/buscar/:cpf", buscarUnico);
rotaCliente.put("/atualizar/:id", update);

export default rotaCliente;
