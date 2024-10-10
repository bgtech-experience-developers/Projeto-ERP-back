import { ClientesRepository } from "../repository/ClientesRepository.js";

const { criar, mostrar, deletar, buscarUnico } = new ClientesRepository();

export class ClienteController {
  async mostrar(req, res, next) {
    try {
      const clientes = await mostrar();
      res.json(clientes);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const { nome, cpf, email, senha, telefone, situacao } = req.body;
      const { cadastrarCliente, message } = await criar(
        nome,
        cpf,
        email,
        senha,
        telefone,
        situacao
      );

      res
        .status(201)
        .json(
          "cadastro realizado com sucesso bem-vindo, " + cadastrarCliente.nome
        );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deletar(req, res) {
    try {
      const { cpf } = req.body;
      const clienteDeletado = await deletar(cpf);
      res.json(clienteDeletado.message);
    } catch (error) {
      res.status(500).json({
        message: "Não foi possivel deletar o cliente" + error.message,
      });
    }
  }
  async buscarUnico(req, response, next) {
    try {
      const cpf = req.params.cpf;

      const cliente = await buscarUnico(cpf);
      response.status(201).json(cliente);
    } catch (error) {
      next(error);
    }
  }
}
