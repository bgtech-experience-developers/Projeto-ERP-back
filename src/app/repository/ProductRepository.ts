import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";

const prima = new PrismaClient();

export default class ProductRepository {
  protected static connectionDb: PrismaClient = InstanciaPrisma.GetConnection();

  // Definir o tipo de dado dos argumentos das funções.
  static async getUniqueProduct(id: number) {
    try {
      const productUnique = this.connectionDb
        .$queryRaw`SELECT p.* i.path FROM product p LEFT JOIN imagem AS i ON p.id_imagem = i.id WHERE p.id = ${id}`;
      console.log(productUnique);
      return "produto buscado com sucesso";
    } catch (error) {
      throw error;
    }
  }
  static async createProduct(data: any) {
    try {
      // Adicionar o relacionamento de product com fornecedor
      return this.connectionDb.product.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAll(take: number, skip: number): Promise<ProductGetAll[]> {
    try {
      return this.connectionDb.product.findMany({
        take,
        skip,
        select: {
          barcode: true,
          name: true,
          supplier_name: true,
          cost_value: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async countAll(): Promise<number> {
    try {
      return this.connectionDb.supplier_pf.count();
    } catch (error) {
      throw error;
    }
  }
}
