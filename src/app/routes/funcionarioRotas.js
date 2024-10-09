import express from "express";
import FuncionariosController from "../controllers/funcionariosController.js";

const rotaFuncionarios = express.Router()

const {criar, buscarTodos, deletar} = new FuncionariosController


rotaFuncionarios.get('/cadastrados', buscarTodos)
rotaFuncionarios.post('/cadastrar', criar)
rotaFuncionarios.delete('/deletar', deletar)

export default rotaFuncionarios