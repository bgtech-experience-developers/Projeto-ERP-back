import express from "express";
import { ClienteController } from "../controller/clientesController.js";
import { erroClient } from "../middleware/errorclient.js";
import { validadorClient } from "../middleware/clientValidator.js";

const rotaCliente = express.Router();

const { criar, mostrar, deletar, buscarUnico, update } =
  new ClienteController();

rotaCliente.post("/cadastrar",validadorClient,criar);
rotaCliente.get("/todos-clientes", mostrar);
rotaCliente.delete("/deletar/:cpf", deletar);
rotaCliente.get("/buscar/:cpf", buscarUnico);
rotaCliente.put("/atualizar/:id", update);
rotaCliente.use(erroClient);
export default rotaCliente;
