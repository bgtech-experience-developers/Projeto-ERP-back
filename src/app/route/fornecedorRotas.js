import express from 'express';
import FornecedorController from '../controller/fornecedorController.js';

const rotaFornecedor = express.Router();

const {buscarUnico, buscarTodos, criar, editarFornecedor, deletar} = new FornecedorController;

rotaFornecedor.post('/cadastrar', criar);
rotaFornecedor.get('/todos-fornecedores', buscarTodos);
rotaFornecedor.delete('/deletar/:cpf', deletar);
rotaFornecedor.get('/buscar/:cpf', buscarUnico);
rotaFornecedor.put('/atualizar/:id', editarFornecedor)

export default rotaFornecedor;