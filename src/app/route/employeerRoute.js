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

employeerRoute.get("/todos-empregador", showAllEmployeer);
employeerRoute.post("/cadastrar-empregrador", createEmployeer);
employeerRoute.put("/:cpf", edituniqueEmployeer);
employeerRoute.get("/:cpf", getUniqueEmployee);
employeerRoute.delete("/excluir-empregador/:cpf", deleteEmployeer);

export default employeerRoute;
