import express from "express";
import { ClienteController } from "../controllers/clientesController.js";
import { erroCLient } from "../middleware/errclients.js";
import { Admin } from "../middleware/authAdmin.js";

const rotaCliente = express.Router();

const { criar, mostrar, deletar, buscarUnico, update } = new ClienteController();

rotaCliente.post("/cadastro", criar, erroCLient);
rotaCliente.get("/cadastrados", mostrar, erroCLient);
rotaCliente.delete("/deletar-cliente/:cpf", Admin, deletar, erroCLient);
rotaCliente.get("/atualizarCliente/:cpf", buscarUnico, erroCLient);
rotaCliente.put("/atualizarCliente/:cpf", update, erroCLient)

export default rotaCliente;
