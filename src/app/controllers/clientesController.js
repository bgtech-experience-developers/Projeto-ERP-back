import { ClientesRepository } from "../repository/ClientesRepository.js";

const {criar, mostrar, deletar} = ClientesRepository

export class ClienteController {

    async mostrar(req, res) {
        try {
            const clientes = await mostrar()
            res.json(clientes)
        } catch(error) {
            res.send(error)
        }
    }

    async criar(req, res) {
        try {
            const {nome, cpf, email, senha, telefone, situacao} = req.body
            const cliente = await criar(cpf, nome, email, senha, telefone, situacao)
            res.status(200).json({message: 'Cliente cadastrado com sucesso!'})

        } catch (error) {
            res.status(500).json({message: 'Erro interno do servidor'})
        }
    }

    async deletar(req, res) {
        try {
            const {cpf} = req.body
            const clienteDeletado = await deletar(cpf)
            res.json(clienteDeletado.message)
        } catch (error) {
            res.status(500).json({message: 'Não foi possivel deletar o cliente' + error.message})
        }
    }
}