import { instanciaPrisma } from "../database/conexao.js";
import byccript from "bcrypt";

export class ClientesRepository {
  async criar(nome, cpf, email, senha, telefone, situacao) {
    try {
      const cliente = await instanciaPrisma.clientes.findUnique({
        where: { cpf },
      });
      if (!cliente) {
        const senhaHas = byccript.hashSync(senha, 10);
        const cadastrarCliente = await instanciaPrisma.clientes.create({
          data: { nome, cpf, email, senha: senhaHas, telefone, situacao },
        });
        const message = { message: "Cadastro realizado com sucesso!" };
        return {
          cadastrarCliente,
          message,
        };
      } else {
        throw new Error("Dados inválidos!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async mostrar() {
    try {
      return await instanciaPrisma.clientes.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletar(cpf) {
    try {
      const cliente = await instanciaPrisma.clientes.findUnique({
        where: { cpf },
      });
      if (!cliente) {
        throw new Error("Cliente não encontrado ou não existe");
      }
      console.log("Chegou aqui");
      
      await instanciaPrisma.clientes.delete({ where: { cpf } });

      const message = { message: "Cliente deletado com sucesso" };
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }
}
