import express from "express";
const employeerRoute = express.Router();
import { employeeController } from "../controller/employeerController.js";

const {
  showAllEmployeer,
  createEmployeer,
  edituniqueEmployeer,
  deleteEmployeer,
  getUniqueEmployee,
} = new employeeController();

employeerRoute.post("/cadastrar", createEmployeer);
employeerRoute.get("/todos-empregadores", showAllEmployeer);
employeerRoute.delete("/deletar/:cpf", deleteEmployeer);
employeerRoute.get("/buscar/:cpf", getUniqueEmployee);
employeerRoute.put("/atualizar/:cpf", edituniqueEmployeer);

export default employeerRoute;
