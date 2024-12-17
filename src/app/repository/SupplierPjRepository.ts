import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { SupplierPj } from "../middleware/SupplierPjValidator.js";

export class SupplierPjRespository {
  private static connection: PrismaClient = InstanciaPrisma.GetConnection();
  static async findSupplierByCnpj(cnpj: string) {
    try {
      return await this.connection.supplier_pj.findFirst({ where: { cnpj } });
    } catch (error) {
      throw error;
    }
  }
  static async findSupplierById(id: number) {
    try {
      return await this.connection.supplier_pj.findFirst({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  static async getAll(status: number | null, page: number, limit: number) {
    try {
      const registerColaboraters = await this.connection
        .$queryRaw`SELECT c.cell_phone1,c.cell_phone2,c.phone2,c.phone1,c1.type,c.name,c.email FROM supplier_pj s LEFT JOIN colaborar.colaborador_interno AS c1 ON c.id = c1.colaboratorId WHERE c.status = ${
        typeof status === "number" ? status : 1
      }
     OR c.status =${typeof status === "number" ? status : 0} `;

      // const registerColaboraters = await this.connection.colaborator.findMany({
      //   include: { colaborator_inner: { select: { type: true } } },
      // }); caso queira utilizar uma orm para fazer a query siga esse padrão
      console.log(registerColaboraters);
      return registerColaboraters;
    } catch (error) {
      throw error;
    }
  }
  static async setSupplier({ pj, address }: SupplierPj, image: AllImagens) {
    try {
      const result = await this.connection.$transaction(async (tsx) => {
        const imageId = await tsx.imagem.create({
          data: { path: image[0] },
          select: { id: true },
        });
        const addressId = await tsx.address.create({ data: { ...address } });
        await tsx.supplier_pj.create({
          data: { ...pj, id_imagem: imageId.id, id_address: addressId.id },
        });
        return "fornecedor cadastrado com sucesso";
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
