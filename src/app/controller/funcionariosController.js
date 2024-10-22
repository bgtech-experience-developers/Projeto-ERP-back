import FuncionariosRepository from "../repository/funcionariosRepository.js";

const { criar, deletar, buscarTodos, atualizarFuncionario } =
  new FuncionariosRepository();

class FuncionariosController {
  async criar(req, res) {
    try {
      const { nome, email, cpf, telefone, celular } = req.body;
      const funcionario = await criar(nome, email, cpf, telefone, celular);
      res.json(funcionario);
    } catch (error) {
      res.json("Não foi possível registrar o funcionário! " + error.message);
    }
  }

  async buscarTodos(req, res) {
    try {
      const funcionario = await buscarTodos();
      res.json(funcionario);
    } catch (error) {
      res.send(error);
    }
  }

  async deletar(req, res) {
    try {
      const { cpf } = req.body;
      const funcionarioDeletado = await deletar(cpf);
      res.json(funcionarioDeletado.message);
    } catch (error) {
      res
        .status(505)
        .send("Não foi possível deletar o funcionário " + error.message);
    }
  }

  async atualizarFuncionario(req, res) {
    try {
      const { nome, email, cpf, celular, telefone } = req.body;
      const { funcionarioAntigo, funcionarioNovo } = await atualizarFuncionario(
        nome,
        email,
        cpf,
        celular,
        telefone
      );
      res.json({ funcionarioNovo, funcionarioAntigo });
    } catch (error) {
      res.json(error);
    }
  }
}

export default FuncionariosController;
