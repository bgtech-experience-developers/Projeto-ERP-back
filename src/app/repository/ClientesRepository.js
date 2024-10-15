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

  async criar(name, rg, date_birth, type, cpf, email,situation,telefone, celular,cep,logradouro,numero,complemento,bairro,cidade) {
    try {
      const data_aniversario = new Date(`${date_birth}T00:00:00Z`)

      const cadastrar_cliente = await instanciaPrisma.client.create({
        data: { name, rg, date_birth: data_aniversario, type, cpf, email,situation,telefone, celular},
      });

      const client_id = cadastrar_cliente.id

      const address = await instanciaPrisma.address.create({
        data: {cep,logradouro,numero,complemento,bairro,cidade}
      })

      const address_id = address.id

      console.log(client_id);
      console.log(address_id);

      const client_address = await instanciaPrisma.client_address.create({
        data: {client_id,address_id}
      })
      
      console.log(client_address);
      
      
      // const Address = 
      const message = { message: "Cadastro realizado com sucesso!" };
      return {cadastrar_cliente, message};
    } catch (error) {
      // console.log(error.meta.target);
      // console.log(error.code) 'P2002' <-- nesse caso é cpf já existente e os campos inválidos?
      console.log(error);
     // ???Em qual parte ficará a questão da validação dos campos, ou seja se os campos foram realmentes esperados!
      throw new Error(error, "CPF já cadastrado");
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
      
      const client_id = await instanciaPrisma.client.findUnique({
        where: {
          cpf: cpf
        },
        select: {
          id: true
        }
      })
            
      const result = await instanciaPrisma.client.deleteMany(
        { 
          where: { id: client_id.id }
        });
      console.log(result);
      
      return { message: "cliente deletado com sucesso" };
    } catch (error) {
      console.log(error);
      
      throw error;

      // throw new Error('Cliente não encontrado!')
    }
  }

  async buscarUnico(cpf) {
    try {
      const cliente = await instanciaPrisma.client.findUnique({
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

  async update(id,name, rg, date_birth, type, cpf, email,situation,telefone, celular, cep,logradouro,numero,complemento,bairro,cidade) {
    try {
      const data_aniversario = new Date(`${date_birth}T00:00:00Z`)
      const client = await instanciaPrisma.client.update({
        where: { id },
        data: {
          name: name,
          rg: rg,
          date_birth: data_aniversario,
          type: type,
          cpf: cpf,
          email: email,
          situation: situation,
          telefone: telefone,
          celular: celular
        },
      });

      console.log(client.id);

      const address_id = await instanciaPrisma.client_address.findMany({
        where: {
          client_id: client.id
        },
        select: {
          address_id: true
        }
      });

      const address = await instanciaPrisma.address.update({
        where: {
          id: address_id[0].address_id
        },
        data: {
          cep: cep,
          logradouro: logradouro,
          numero: numero,
          complemento: complemento,
          bairro: bairro,
          cidade: cidade
        }
      })
      






      return { message: "Cliente atualizado com sucesso!" };
      // return cliente
    } catch (error) {
      console.log(error);
      throw error;

      // throw error
    }
  }
}
