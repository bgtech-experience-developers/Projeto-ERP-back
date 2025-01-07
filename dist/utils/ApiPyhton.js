import fs from "fs";
import { RepositoryImport } from "../importRepoitory/importExcel.js";
export class ApiPhy {
    // static connection: PrismaClient = InstanciaPrisma.GetConnection();
    static async emailToPython(email) { }
    static async getDataExcel(url, api_key) {
        try {
            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${api_key}` },
                method: "GET",
            });
            return await response.json();
        }
        catch (error) {
            throw error;
        }
    }
    static async getImageExcel(api_key, url, path) {
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
        }
        catch (error) {
            throw error;
        }
    }
    static async getExcelPython(api_key, urlData, urlImage) {
        try {
            const dataExcel = await this.getDataExcel(urlData, api_key);
            const pathDump = "./dump/clientes_api.json";
            const dataImageExcel = await this.getImageExcel(api_key, urlImage, pathDump);
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
            console.log("importação finalizada com sucesso, agora so realizar a copia dos dados que estão armazenados no db");
            return "deu certo";
        }
        catch (error) {
            throw error;
        }
    }
    static async sanitizeDataPython(data) {
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
        }
        catch (error) {
            throw error;
        }
    }
}
ApiPhy.getExcelPython("$2b$10$RDlnK2JbMHNyw3tUnSye7.fGBlHbBtD552xWdr2BQ1MWpR3mfhHiy", "http://127.0.0.1:5000/dados", "http://127.0.0.1:5000/get/imagens");
