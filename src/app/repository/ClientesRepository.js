import { instanciaPrisma } from "../database/conexao.js";
import { Exist, NotFound } from "../err/clientError.js";

import byccript from "bcrypt";
// class UsuarioCadastrado extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "usuário ja cadastrado";
//   }
// }

export class ClientesRepository {
  async criar(nome, cpf, email, senha, telefone, situacao) {
    try {
      const cliente = await instanciaPrisma.clientes.findUnique({
        where: { cpf },
      });
      if (!cliente) {
        const senhaHas = byccript.hashSync(senha, 10);
        console.log(senhaHas);
        const cadastrarCliente = await instanciaPrisma.clientes.create({
          data: { nome, cpf, telefone, email, senha: senhaHas, situacao },
        });
        const message = { message: "Cadastro realizado com sucesso!" };
        return {
          cadastrarCliente,
          message,
        };
      } else {
        throw new Exist("usuário ja cadastrado no sistema");
      }
    } catch (error) {
      throw error;
    }
  }

  async mostrar() {
    try {
      return await instanciaPrisma.clientes.findMany({
        select: {
          nome: true,
          cpf: true,
          email: true,
          telefone: true,
        },
      });
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

      await instanciaPrisma.clientes.delete({ where: { cpf } });

      const message = { message: "Cliente deletado com sucesso" };
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }
  async buscarUnico(cpf) {
    try {
      const client = await instanciaPrisma.clientes.findUnique({
        where: { cpf },
        select: {
          nome: true,
          email: true,
          telefone: true,
          cpf: true,
        },
      });
      if (client) {
        return client;
      } else {
        throw new NotFound("usuário não encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}
