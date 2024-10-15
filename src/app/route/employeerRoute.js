import express from 'express'
const employeerRoute = express.Router()
import { employeeController } from '../controller/employeerController.js'

const {showAllEmployeer, createEmployeer, uniqueEmployeer, deleteEmployeer} = new employeeController

employeerRoute.get('/todos-empregador', showAllEmployeer)
employeerRoute.post('/cadastrar-empregrador', createEmployeer)
employeerRoute.put('/:cpf', uniqueEmployeer)
employeerRoute.delete('/excluir-empregador/:cpf', deleteEmployeer)

export default employeerRoute