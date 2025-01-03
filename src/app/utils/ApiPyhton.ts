import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { AllError } from "../error/AllError.js";
interface dataPython {
  Cliente: string;
  "CIDADE / ESTADO": string;
  "CONTATO CONTÁBIL (XML)": string;
  ENDEREÇO: string;
  EMAIL: string;
  "RAZÃO SOCIAL": string;
  TELEFONE: string;
  "TELEFONE FIXO": string;
  "INSCR. ESTADUAL": string;
  EMPRESA: string;
  CNPJ: string;
  "RAMO DE ATUAÇÃO PRINCIPAL": string;
  "CPF CONTATO": string;
  "CONTATO FINANCEIRO": string;
  "SÓCIO 01": string;
  imagem: string;
}

export class ApiPhy {
  // static connection: PrismaClient = InstanciaPrisma.GetConnection();
  static async emailToPython(email: string) {}
  static async getExcelPython(api_key: string, url: string) {
    try {
      const data = await fetch(url, {
        headers: { Authorization: api_key },
        method: "GET",
      });
      const response: dataPython = await data.json();
      const dataSanitize = await this.sanitizeDataPython(response);

      return "deu certo";
    } catch (error) {
      throw error;
    }
  }
  static async sanitizeDataPython(data: dataPython) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
