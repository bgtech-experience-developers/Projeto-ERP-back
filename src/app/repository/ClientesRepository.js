import { instanciaPrisma } from "../database/conexao.js";

import byccript from "bcrypt";
// class UsuarioCadastrado extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "usuário ja cadastrado";
//   }
// }

export class ClientesRepository {
  // async criar(nome, cpf, email, senha, telefone, situacao, rua, cep) {
  //   try {
  //     const cliente = await instanciaPrisma.client.findUnique({
  //       where: { cpf },
  //     });
  //     if (!cliente) {
  //       const senhaHas = byccript.hashSync(senha, 10);
  //       console.log(senhaHas);
  //       const cadastrarCliente = await instanciaPrisma.clientes.create({
  //         data: { nome, cpf, telefone, email, senha: senhaHas, situacao },
  //       });

  //       const message = { message: "Cadastro realizado com sucesso!" };
  //       return {
  //         cadastrarCliente,
  //         message,
  //       };
  //     } else {
  //       throw new Exist("usuário ja cadastrado no sistema");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async mostrar() {
  //   try {
  //     return await instanciaPrisma.clientes.findMany({
  //       select: {
  //         nome: true,
  //         cpf: true,
  //         email: true,
  //         telefone: true,
  //       },
  //     });
  //   } catch (error) {
  //     throw error
  //   }
  // }

  async criar(nome, cpf, email, senha, telefone, situacao) {
    try {
      const senhaHas = byccript.hashSync(senha, 10);
      console.log(senhaHas);
      const cadastrarCliente = await instanciaPrisma.clientes.create({
        data: { nome, cpf, telefone, email, senha: senhaHas, situacao },
      });
      const message = { message: "Cadastro realizado com sucesso!" };
      return cadastrarCliente, message;
    } catch (error) {
      // console.log(error.meta.target);
      // console.log(error.code) 'P2002' <-- nesse caso é cpf já existente e os campos inválidos?

      throw error;
      // ???Em qual parte ficará a questão da validação dos campos, ou seja se os campos foram realmentes esperados!
      throw new Error("CPF já cadastrado");
    }
  }

  // async deletar(cpf) {
  //   // essa rota precisa de uma autenticação de um admin
  //   try {
  //     const cliente = await instanciaPrisma.clientes.findUnique({
  //       where: { cpf },
  //     });
  //     if (!cliente) {
  //       throw new NotFound("Cliente não encontrado ou não existe");
  //     }

  //     // await instanciaPrisma.enderecos.deleteMany({where:{UserId:cliente.id}}) futuramente integrar essa linha quando tiver feito os relacionamentos

  //     await instanciaPrisma.clientes.delete({ where: { cpf } });
  //     return { message: "cliente deletado com sucesso" };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async deletar(cpf) {
    try {
      // await instanciaPrisma.enderecos.deleteMany({where:{UserId:cliente.id}}) futuramente integrar essa linha quando tiver feito os relacionamentos

      await instanciaPrisma.clientes.delete({ where: { cpf } });
      return { message: "cliente deletado com sucesso" };
    } catch (error) {
      throw error;

      // throw new Error('Cliente não encontrado!')
    }
  }

  async buscarUnico(cpf) {
    try {
      const cliente = await instanciaPrisma.clientes.findUnique({
        where: { cpf },
      });
      if (!cliente) {
        // const error =  new Error("Cliente não encontrado!")
        // error.statusCode  = 404

        throw new Error("Cliente não encontrado!");

        // throw new Error('Cliente não encontrado!');
      }
      return cliente;
    } catch (error) {
      console.log(error.statusCode);

      throw error;
    }
  }

  async update(id, nome, cpf, email, senha, situacao, telefone) {
    try {
      const cliente = await instanciaPrisma.clientes.update({
        where: { id },
        data: {
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senha,
          situacao: situacao,
          telefone: telefone,
        },
      });

      return { message: "Cliente atualizado com sucesso!" };
      // return cliente
    } catch (error) {
      console.log(error.code);
      throw error;

      // throw error
    }
  }
}
