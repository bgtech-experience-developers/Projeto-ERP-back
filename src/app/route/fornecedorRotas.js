import express from 'express';
import FornecedorController from '../controller/fornecedorController.js';

const rotaFornecedor = express.Router();

const {buscarUnico, buscarTodos, criar, deletar} = new FornecedorController;

rotaFornecedor.post('/cadastro', criar);
rotaFornecedor.get('/mostrar-todos', buscarTodos);
rotaFornecedor.get('/mostrar-unico', buscarUnico);
rotaFornecedor.delete('/deletar-cadastro', deletar);

export default rotaFornecedor;