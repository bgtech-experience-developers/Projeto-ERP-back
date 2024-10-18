import { instanciaPrisma } from "../database/conexao.js";

import byccript from "bcrypt";
import { PrismaClient } from "@prisma/client/extension";


export class ClientesRepository {
 

  async criar(name, rg, date_birth, type, cpf, email,situation,telefone, celular,cep,logradouro,numero,complemento,bairro,cidade) {
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


      

      // const id_result =posts.id
      // await instanciaPrisma.$transaction(async (prisma) => {

      //   const cadastrar_cliente = await prisma.client.create({
      //     data: { name, rg, date_birth: data_aniversario, type, cpf, email,situation,telefone, celular},
      //   });  

      //   const client_id = cadastrar_cliente.id

      //   const address = await prisma.address.create({
      //     data: {cep,logradouro,numero,complemento,bairro,cidade}
      //   })
  
      //   const address_id = address.id

      //   const client_address = await prisma.client_address.create({
      //     data: {client_i,address_id}
      //   }z)

      // console.log(client_address);

      // })
      // const cadastrar_cliente = await instanciaPrisma.client.create({
      //   data: { name, rg, date_birth: data_aniversario, type, cpf, email,situation,telefone, celular},
      // });

      // const client_id = cadastrar_cliente.id

      // const address = await instanciaPrisma.address.create({
      //   data: {cep,logradouro,numero,complemento,bairro,cidade}
      // })

      // const address_id = address.id

      // console.log(client_id);
      // console.log(address_id);

      // const client_address = await instanciaPrisma.client_address.create({
      //   data: {client_id,address_id}
      // })
      
      // const Address = 
    } catch (error) {
      // console.log(error.meta.target);
      // console.log(error.code) 'P2002' <-- nesse caso é cpf já existente e os campos inválidos?
      console.log(error);
      
      throw error;
      // ???Em qual parte ficará a questão da validação dos campos, ou seja se os campos foram realmentes esperados!
      throw new Error("CPF já cadastrado");
    }
  }

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
    }
  }

  async buscarUnico(cpf) {
    try {
      const cliente = await instanciaPrisma.client.findUnique({
        where: { cpf },
      });
      if (!cliente) {

        throw new Error("Cliente não encontrado!");

      }
      return cliente;
    } catch (error) {
      console.log(error.statusCode);

      throw error;
    }
  }

  async update(id,name, rg, date_birth, type, cpf, email,situation,telefone, celular,cep,logradouro,numero,complemento,bairro,cidade) {
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
    

    // await instanciaPrisma.address.update({
    //   where: {client_address.id}
    // })


      // const client = await instanciaPrisma.client.update({
      //   where: { id },
      //   data: {
      //     name: name,
      //     rg: rg,
      //     date_birth: data_aniversario,
      //     type: type,
      //     cpf: cpf,
      //     email: email,
      //     situation: situation,
      //     telefone: telefone,
      //     celular: celular
      //   },
      // });

      // console.log(client.id);

      // const address_id = await instanciaPrisma.client_address.findMany({
      //   where: {
      //     client_id: client.id
      //   },
      //   select: {
      //     address_id: true
      //   }

      // });

      // console.log();

      // const address = await instanciaPrisma.address.update({
      //   where: {
      //     id: address_id[0].address_id
      //   },
      //   data: {
      //     cep: cep,
      //     logradouro: logradouro,
      //     numero: numero,
      //     complemento: complemento,
      //     bairro: bairro,
      //     cidade: cidade
      //   }
      // })
    

      return { message: "Cliente atualizado com sucesso!" };
      // return cliente
    } catch (error) {
      console.log(error);
      throw error;

      // throw error
    }
  }
}
