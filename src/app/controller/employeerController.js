import { json } from "express";
import { instanciaPrisma } from "../database/conexao.js";
import { employeerRepository } from "../repository/employeerRepository.js";

const {
  showAllEmployeer,
  createEmployeer,
  EditEmployeer,
  deleteEmployeer,
  getUniqueEmployer,
} = new employeerRepository();
export class employeeController {
  async showAllEmployeer(req, res) {
    try {
      const { include } = req.query;
      const employeer = await showAllEmployeer(include);
      res.json(employeer);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createEmployeer(req, res) {
    try {
      const employeerData = req.body;
      const { message, adresses, employeer } = await createEmployeer(
        employeerData
      );

      res.status(200).json({ employeer, message });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUniqueEmployee(req, res) {
    try {
      const { cpf } = req.params;
      const employeer = await getUniqueEmployer(cpf);
      res.status(201).json(employeer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json(error.message);
        return;
      }
      res.status(500).json("erro interno do servidor");
    }
  }

  async edituniqueEmployeer(req, res) {
    try {
      const { cpf } = req.params;
      const takeAddress = req.body;
      const showData = await EditEmployeer(cpf, takeAddress);
      res.status(200).send(showData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEmployeer(req, res) {
    try {
      const { cpf } = req.params;
      const clearData = await deleteEmployeer(cpf);
      res.status(200).json({ clearData, message: "contratante excluido" });
    } catch (error) {
      if (error.code === "P2025") {
        res.status(404).json("funcionário  não encontrado");
        return;
      }
      res.status(500).json("erro interno do servidor");
    }
  }
}
