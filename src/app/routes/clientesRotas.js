import express from "express";
import { ClienteController } from "../controllers/clientesController.js";
import { erroCLient } from "../middleware/errclients.js";

const rotaCliente = express.Router();

const { criar, mostrar, deletar, buscarUnico } = new ClienteController();

rotaCliente.post("/cadastro", criar, erroCLient);
rotaCliente.get("/cadastrados", mostrar, erroCLient);
rotaCliente.delete("/deletar-cliente/:cpf", deletar, erroCLient);
rotaCliente.get("/pegar-client/:cpf", buscarUnico, erroCLient);

export default rotaCliente;
