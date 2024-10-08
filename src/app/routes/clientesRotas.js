import express from 'express';
import { ClienteController } from '../controllers/clientesController.js';

const rotaCliente = express.Router()

const {criar, mostrar, deletar} = new ClienteController

rotaCliente.post('/cadastro', criar)
rotaCliente.get('/cadastrados', mostrar)
rotaCliente.delete('/deletar-cliente', deletar)

export default rotaCliente