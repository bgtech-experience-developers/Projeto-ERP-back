import express from 'express'
const employeerRoute = express.Router()
import { employeeController } from '../controller/employeerController.js'

const {showAllEmployeer, createEmployeer} = new employeeController

employeerRoute.get('/todos-fornecedores', showAllEmployeer)
employeerRoute.post('/cadastrar-fornecedor', createEmployeer)

export default employeerRoute