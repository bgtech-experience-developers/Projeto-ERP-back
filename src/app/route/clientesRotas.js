import express from "express";
import { ClienteController } from "../controller/clientesController.js";

const rotaCliente = express.Router();

const { criar, mostrar, deletar, buscarUnico, update } =
  new ClienteController();

rotaCliente.post("/cadastro", criar);
rotaCliente.get("/cadastrados", mostrar);
rotaCliente.delete("/deletar-cliente/:cpf", deletar);
rotaCliente.get("/buscar-cliente/:cpf", buscarUnico);
rotaCliente.put("/atualizarCliente/:id", update);

export default rotaCliente;
