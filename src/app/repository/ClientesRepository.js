import { instanciaPrisma } from "../database/conexao.js";

import byccript from "bcrypt";
import { PrismaClient } from "@prisma/client/extension";


export class ClientesRepository {

 

//   async mostrar() {
//     try {
//       const clientes = await instanciaPrisma.client.findMany({
//         orderBy: { createdAt: "desc" },
//       });
//       return {
//         mensagem: "retornando os clientes de acordo com a sua inserção",
//         clientes,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }


  async mostrar() {
    try {
      return await instanciaPrisma.client.findMany({
        orderBy:{
          id: 'desc'
        },
        include:{
          cliente_address:{
            include:{
              address: true
            }
          }
        }
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


      const data_aniversario = new Date(`${date_birth}T00:00:00Z`);

      const [client, address] = await instanciaPrisma.$transaction([
        instanciaPrisma.client.create({ data: { name, rg, date_birth: data_aniversario, type, cpf, email,situation,telefone, celular}}),
        instanciaPrisma.address.create({data: {cep,logradouro,numero,complemento,bairro,cidade}})
        
      ]);

      console.log(client, address);

      await instanciaPrisma.client_address.create({data: {
        client_id: client.id,
        address_id: address.id
      }})

      return {message: "Olá, fí duma eguá"}




      
 


    } catch (error) {
   
      console.log(error);

      throw error;
      // ???Em qual parte ficará a questão da validação dos campos, ou seja se os campos foram realmentes esperados!
      throw new Error("CPF já cadastrado");
    }
  }

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


    const birth_date = new Date(`${date_birth}T00:00:00Z`)

    const [client, client_address] = await instanciaPrisma.$transaction([
      instanciaPrisma.client.update({
        where: {id},
          data: {
            name: name,
            rg: rg,
            date_birth: birth_date,
            type: type,
            cpf: cpf,
            email: email,
            situation: situation,
            telefone: telefone,
            celular: celular

          }
      }),

      instanciaPrisma.client_address.findMany({
        where: {

          client_id: id
        },

        select: {
          address_id:true
        }
      })

    ]);
    console.log(client,client_address);
    


      return { message: "Cliente atualizado com sucesso!" };
      // return cliente
    } catch (error) {
      console.log(error);
      throw error;

      // throw error
    }
  }
}
