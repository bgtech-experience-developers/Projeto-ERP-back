import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { AllError } from "../error/AllError.js";
import { json } from "node:stream/consumers";

import path from "path";
import fs from "fs";
import { SupplierControllerPj } from "../controller/SupplierControllerPj.js";
import { ClientRequest } from "node:http";
import { RepositoryImport } from "../importRepoitory/importExcel.js";
interface dataImagePython {
  empresa: string;
  socio: string;
  cliente: string;
  name: string | null;
}
export interface photos extends bodyCreateClient {
  photoOwner: string | null;
  photoClient: string | null;
  photoAccouting: string | null;
  photoCommercial: string | null;
  photoFinance: string | null;
  empresa: string;
}

interface dataPython extends dataImagePython {
  CLiente: string;
  BAIRRO: string;
  "CIDADE / ESTADO": string;
  ENDEREÇO: string;
  EMAIL: string;
  "RAZÃO SOCIAL": string;
  TELEFONE: string;
  "TELEFONE FIXO": string;
  "INSCR. ESTADUAL": string;
  EMPRESA: string;
  CNPJ: string;
  "RAMO DE ATUAÇÃO PRINCIPAL": string;
  "RAMO DE ATUAÇÃO": string;
}

export class ApiPhy {
  // static connection: PrismaClient = InstanciaPrisma.GetConnection();
  static async emailToPython(email: string) {}
  static async getDataExcel(
    url: string,
    api_key: string
  ): Promise<dataPython[]> {
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${api_key}` },
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  static async getImageExcel(api_key: string, url: string, path: string) {
    try {
      if (!fs.existsSync(path)) {
        const data = await fetch(url, {
          headers: { Authorization: `Bearer ${api_key}` },
          method: "GET",
        });
        const reponse = JSON.stringify(await data.json());
        fs.writeFileSync(path, reponse);
        return JSON.parse(fs.readFileSync(path, "utf-8"));
      }
      return JSON.parse(fs.readFileSync(path, "utf-8"));
    } catch (error) {
      throw error;
    }
  }
  static async getExcelPython(
    api_key: string,
    urlData: string,
    urlImage: string
  ) {
    try {
      const dataExcel: dataPython[] = await this.getDataExcel(urlData, api_key);
      const pathDump = "./dump/clientes_api.json";
      const dataImageExcel: dataImagePython[] = await this.getImageExcel(
        api_key,
        urlImage,
        pathDump
      );
      //
      dataExcel.forEach((cliente, index) => {
        const [valueIgual] = dataImageExcel.filter((clientes, index) => {
          if (cliente.CLiente === clientes.empresa) {
            return true;
          }
        });
        dataExcel[index] = {
          ...cliente,
          socio: valueIgual.socio,
          cliente: valueIgual.cliente,
          name: valueIgual.name,
        };
      });
      const dataSanitize = await this.sanitizeDataPython(dataExcel);
      console.log(dataSanitize);
      const result = await RepositoryImport.setIntoDb(dataSanitize);
      console.log(result);
      console.log(
        "importação finalizada com sucesso, agora so realizar a copia dos dados que estão armazenados no db"
      );

      return "deu certo";
    } catch (error) {
      throw error;
    }
  }
  static async sanitizeDataPython(data: dataPython[]): Promise<photos[]> {
    try {
      return data.map((cliente) => {
        return {
          empresa: cliente.CLiente,
          contabil: {
            cell_phone: null,
            cpf: null,
            email: null,
            name: null,
            phone: null,
            rg: null,
          },
          financeiro: {
            cell_phone: null,
            cpf: null,
            email: null,
            name: null,
            phone: null,
            rg: null,
          },
          comercial: {
            cell_phone: null,
            cpf: null,
            email: null,
            name: null,
            phone: null,
            rg: null,
          },
          socio: {
            cell_phone: cliente.TELEFONE ? cliente.TELEFONE : null,
            cpf: null,
            email: cliente.EMAIL ? cliente.EMAIL : null,
            name: cliente.name,
            phone: cliente["TELEFONE FIXO"] ? cliente["TELEFONE FIXO"] : null,
            rg: null,
          },
          photoOwner: cliente.socio,
          photoClient: cliente.cliente,
          photoAccouting: null,
          photoCommercial: null,
          photoFinance: null,
          endereco_empresa: {
            cep: null,
            city: cliente["CIDADE / ESTADO"]
              ? cliente["CIDADE / ESTADO"]

                  .replace(/[./|]/gi, "-")
                  .split(" -")[0]
              : null,
            complement: null,
            state: cliente["CIDADE / ESTADO"]
              ? cliente["CIDADE / ESTADO"]
                  .replace(/[./|]/gi, "-")
                  .split("- ")[1]
              : null,
            neighborhood: cliente.BAIRRO ? cliente.BAIRRO : null,
            street: cliente.ENDEREÇO ? cliente.ENDEREÇO : null,
            number: null,
            created_at: "",
            update_at: "",
          },
          endereco_entrega: {
            cep: null,
            city: null,
            complement: null,
            state: null,
            neighborhood: null,
            street: null,
            number: null,
            created_at: "",
            update_at: "",
          },
          cliente: {
            branch_activity: cliente["RAMO DE ATUAÇÃO PRINCIPAL"]
              ? cliente["RAMO DE ATUAÇÃO PRINCIPAL"]
              : cliente["RAMO DE ATUAÇÃO"]
              ? cliente["RAMO DE ATUAÇÃO"]
              : null,
            cnpj: cliente.CNPJ ? cliente.CNPJ.slice(0, 14) : "",

            fantasy_name: cliente.empresa ? cliente.empresa : cliente.CLiente,
            corporate_reason: cliente["RAZÃO SOCIAL"]
              ? cliente["RAZÃO SOCIAL"]
              : "",
            id: 10,
            state_registration: cliente["INSCR. ESTADUAL"]
              ? cliente["INSCR. ESTADUAL"]
              : null,
            created_at: "",
            update_at: "",
            situation: true,
            type_contribuition: null,
          },
        };
      });
    } catch (error) {
      throw error;
    }
  }
}

ApiPhy.getExcelPython(
  "$2b$10$RDlnK2JbMHNyw3tUnSye7.fGBlHbBtD552xWdr2BQ1MWpR3mfhHiy",
  "http://127.0.0.1:5000/dados",
  "http://127.0.0.1:5000/get/imagens"
);
