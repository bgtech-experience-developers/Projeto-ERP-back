import { Prisma } from "@prisma/client";
import { ClientesRepository } from "../repository/ClientesRepository.js";

const { criar, mostrar, deletar, buscarUnico, update } =
  new ClientesRepository();

const regex = /[./-/]/gi;
export class ClienteController {
  async mostrar(req, res, next) {
    try {
      const clientes = await mostrar();
      res.json(clientes);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async criar(req, res, next) {
    try {
      const {
        name,
        rg,
        date_birth,
        type,
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
        cidade,
      } = req.body;

      const { message } = await criar(
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
        cidade,
        type
      );

      return res.status(201).json(message);
    } catch (error) {
      // console.log(error);

      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Usuário já cadastrado no sistema!" });
      }

      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  }

  async deletar(req, res, next) {
    try {
      const { cpf } = req.params;
      console.log(cpf);

      const clienteDeletado = await deletar(cpf);
      return res.status(200).json(clienteDeletado.message);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Cliente não encontrado!" });
      }

      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  }

  async buscarUnico(req, res, next) {
    try {
      const { include } = req.query;
      const { cpf } = req.params;
      const cliente = await buscarUnico(cpf, include);
      console.log(cliente);

      return res.status(200).json(cliente);
    } catch (error) {
      if (error.message === "Cliente não encontrado!") {
        return res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: "Erro interno no servidor!" });
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);

      const {
        name,
        rg,
        date_birth,

        type,
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
        cidade,
      } = req.body;

      const atualizar = await update(
        id,
        name,
        rg,

        date_birth,
        type,
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
      );

      return res.status(201).json(atualizar.message);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      } else if (error.code === "P2002") {
        return res.status(409).json({ message: "CPF já cadastro!" });
      }

      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  }
}
