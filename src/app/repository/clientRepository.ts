import { InstanciaPrisma } from "../db/PrismaClient.js";
import { ClientCreate } from "../controller/client.js";
import { Files } from "../middleware/ClientValidator.js";
const connectionDb = InstanciaPrisma.GetConnection(); //gerando uma conexxão
export class ClientRepository {
  static createCliente(
    {
      cliente,
      comercial,
      financeiro,
      contabil,
      socio,
      endereco_empresa,
      endereco_entrega,
    }: ClientCreate,
    imagens: Files[]
  ) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();

      return { mensagem: "cliente cadastrado com sucesso" };
    } catch (error) {
      throw error;
    }
  }
  static async GetuniqueClient(cnpj: string) {
    try {
      const connectionDb = InstanciaPrisma.GetConnection();
      return await connectionDb.client.findFirst({ where: { cnpj } });
    } catch (error) {
      throw error;
    }
  }
}
