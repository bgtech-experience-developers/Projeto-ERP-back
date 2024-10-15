import express from "express";
import FuncionariosController from "../controller/funcionariosController.js";

const rotaFuncionarios = express.Router()

const {criar, buscarTodos, deletar, atualizarFuncionario} = new FuncionariosController


rotaFuncionarios.get('/cadastrados', buscarTodos)
rotaFuncionarios.post('/cadastrar', criar)
rotaFuncionarios.put('/atualizar-funcionario', atualizarFuncionario)
rotaFuncionarios.delete('/deletar', deletar)

export default rotaFuncionarios