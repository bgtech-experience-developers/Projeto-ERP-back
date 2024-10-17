import express from "express";
const employeerRoute = express.Router();
import { employeeController } from "../controller/employeerController.js";

<<<<<<< Updated upstream
const {
  showAllEmployeer,
  createEmployeer,
  edituniqueEmployeer,
  deleteEmployeer,
  getUniqueEmployee,
} = new employeeController();

employeerRoute.get("/todos-empregador", showAllEmployeer);
employeerRoute.post("/cadastrar-empregrador", createEmployeer);
employeerRoute.put("/:cpf", edituniqueEmployeer);
employeerRoute.get("/:cpf", getUniqueEmployee);
employeerRoute.delete("/excluir-empregador/:cpf", deleteEmployeer);
=======
const {showAllEmployeer, showOneEmployeer, createEmployeer, uniqueEmployeer, deleteEmployeer} = new employeeController

employeerRoute.get('/todos-empregador', showAllEmployeer)
// employeerRoute.get('/:id', showOneEmployeer)
employeerRoute.post('/cadastrar-empregrador', createEmployeer)
employeerRoute.put('/:cpf', uniqueEmployeer)
employeerRoute.delete('/excluir-empregador/:cpf', deleteEmployeer)
>>>>>>> Stashed changes

export default employeerRoute;
