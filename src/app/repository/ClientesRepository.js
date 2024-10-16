import { instanciaPrisma } from "../database/conexao.js";

import byccript from "bcrypt";
// class UsuarioCadastrado extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "usuário ja cadastrado";
//   }
// }

export class ClientesRepository {
  async mostrar() {
    try {
      const clientes = await instanciaPrisma.client.findMany({
        orderBy: { createdAt: "desc" },
      });
      return {
        mensagem: "retornando os clientes de acordo com a sua inserção",
        clientes,
      };
    } catch (error) {
      throw error;
    }
  }
  // async criar(nome, cpf, email, senha, telefone, situacao, rua, cep) {
  //   try {
  //     const cliente = await instanciaPrisma.client.findUnique({
  //       where: { cpf },
  //     });
  //     if (!cliente) {
  //       const senhaHas = byccript.hashSync(senha, 10);
  //       console.log(senhaHas);
  //       const cadastrar_cliente = await instanciaPrisma.clientes.create({
  //         data: { nome, cpf, telefone, email, senha: senhaHas, situacao },
  //       });

  //       const message = { message: "Cadastro realizado com sucesso!" };
  //       return {
  //         cadastrar_cliente,
  //         message,
  //       };
  //     } else {
  //       throw new Exist("usuário ja cadastrado no sistema");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async mostrar() {
    try {
      return await instanciaPrisma.client.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async criar(
    name,
    rg,
    date_birth,

    cpf,
    email,
    situation,
    telefone,
    celular,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade
  ) {
    try {
      const data_aniversario = new Date(`${date_birth}T02:00:00Z`);

      const cadastrar_cliente = await instanciaPrisma.client.create({
        data: {
          name,
          rg,
          date_birth: data_aniversario,
          cpf,
          email,
          situation,
          telefone,
          celular,
        },
      });

      const client_id = cadastrar_cliente.id;

      const address = await instanciaPrisma.address.create({
        data: { cep, logradouro, numero, complemento, bairro, cidade },
      });

      const address_id = address.id;

      console.log(client_id);
      console.log(address_id);

      const client_address = await instanciaPrisma.client_address.create({
        data: { client_id, address_id },
      });

      console.log(client_address);

      // const Address =

      const message = { message: "Cadastro realizado com sucesso!" };
      return { cadastrar_cliente, message };
    } catch (error) {
      // console.log(error.meta.target);
      // console.log(error.code) 'P2002' <-- nesse caso é cpf já existente e os campos inválidos?
      console.log(error);

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
      console.log();
      const { id } = await instanciaPrisma.client.findUnique({
        where: {
          cpf,
        },
        select: { id: true },
      });

      if (!id) {
        throw new Error("cliente não encontrado");
      }

      const result = await instanciaPrisma.client_address.deleteMany({
        where: { client_id: id },
      });
      const userDelet = await instanciaPrisma.client.delete({ where: { id } });

      return { message: "cliente deletado com sucesso" };
    } catch (error) {
      console.log(error);

      throw error;

      // throw new Error('Cliente não encontrado!')
    }
  }

  async buscarUnico(cpfcliente, include) {
    try {
      const boolean = include === "true" ? true : false;

      const cliente = await instanciaPrisma.client.findUnique({
        where: { cpf: cpfcliente },

        include: {
          cliente_address: {
            include: { address: boolean },
          },
        },
      });
      if (!cliente) {
        throw new Error("Cliente não encontrado!");
      }
      if (include) {
        let {
          name,
          rg,
          date_birth,
          cpf,
          telefone,
          celular,
          email,
          cliente_address,
          id,
        } = cliente;
        date_birth = date_birth.toLocaleDateString();
        const [{ address }] = cliente_address;

        return {
          id,
          name,
          rg,
          date_birth,
          cpf,
          email,
          telefone,
          celular,
          address,
        };
      }
      return [
        ({ email, rg, telefone, celular, id, name, cpf, date_birth } = cliente),
      ];
    } catch (error) {
      throw error;
    }
  }

  async update(
    id,
    name,
    rg,
    date_birth,

    email,
    situation,
    telefone,
    celular,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade
  ) {
    try {
      const data_aniversario = new Date(`${date_birth}T00:00:00Z`);

      const client = await instanciaPrisma.client.update({
        where: { id },
        data: {
          name,
          rg,
          date_birth: data_aniversario,
          email,
          situation,
          telefone,
          celular,
          cpf: "10-1010-1",
        },
      });

      console.log(client.id);

      const address_id = await instanciaPrisma.client_address.findMany({
        where: {
          client_id: client.id,
        },

        select: {
          address_id: true,
        },
      });

      const address = await instanciaPrisma.address.update({
        where: {
          id: address_id[0].address_id,
        },
        data: {
          cep: cep,
          logradouro: logradouro,
          numero: numero,
          complemento: complemento,
          bairro: bairro,
          cidade: cidade,
        },
      });

      return { message: "Cliente atualizado com sucesso!" };
      // return cliente
    } catch (error) {
      console.log(error);
      throw error;

      // throw error
    }
  }
}
