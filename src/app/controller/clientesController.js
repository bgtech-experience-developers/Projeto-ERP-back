import { Prisma } from "@prisma/client";
import { ClientesRepository } from "../repository/ClientesRepository.js";

const { criar, mostrar, deletar, buscarUnico, update } = new ClientesRepository();

export class ClienteController {

  async mostrar(req, res, next) {
    try {
      const clientes = await mostrar();
      res.json(clientes);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({message:'Erro interno no servidor!'})
      
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
      console.log(error.code);
      
      if(error.code === 'P2002'){
        return res.status(409).json({message: 'Usuário já cadastrado no sistema!'})
      }
       
      res.status(500).json({message: 'Erro interno de servidor!'})
    }

  

  }

  async deletar(req, res, next) {
    try {
      const { cpf } = req.params;
      console.log(cpf);
      
      const clienteDeletado = await deletar(cpf);
      res.status(200).json(clienteDeletado.message);

    } catch (error) {

      if(error.code === 'P2025'){
        return res.status(409).json({message: 'Cliente não encontrado!'})
      }

      res.status(500).json({message: 'Erro interno de servidor!'})
      
    }
  }

  async buscarUnico(req, res, next) {
    try {
      const cpf = req.params.cpf;
    
      const cliente = await buscarUnico(cpf);
      res.status(201).json(cliente);
    } catch (error) {
      if(error.message  === 'Cliente não encontrado!') {
        return res.status(404).json({message: error.message})
      }

      res.status(500).json({message: 'Erro interno no servidor!'})

    }
  }

  async update(req, res, next) { 
    try {
      const id =req.params.id
      // o erro era de typo, e o erro de undefined é que estava caindo no catch do repository mais n estav lançando ele pro controller
      let id1 =Number(id) 
      console.log(typeof(id1));
      
     
      
      const {nome,cpf,email,senha,situacao,telefone} = req.body;
      

      const atualizar = await update(id1,nome,cpf,email,senha,situacao,telefone);
      
      res.status(200).json(atualizar.message)
     } catch (error) {
      if(error.code === 'P2025')
          return res.status(404).json({message: 'Usuário não encontrado!'})
     }
        res.status(500).json({message: 'Erro interno de servidor!'})
     
  }
}
