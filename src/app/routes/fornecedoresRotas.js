import express from "express";
import FornecedoresController from "../controllers/fornecedoresController.js";

const rotaFornecedor = express.Router()

const {criar, mostrar, deletar} = new FornecedoresController

rotaFornecedor.post('/cadastrar', criar);
rotaFornecedor.get('/cadastrados', mostrar);
rotaFornecedor.delete('/deletar-cadastro', deletar);

export default rotaFornecedor