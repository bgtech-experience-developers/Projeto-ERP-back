import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { extname } from "path";
import { extend } from "joi";
interface GetuniqueProduct extends Product {
  path: string;
}
type productUnique = GetuniqueProduct[] | undefined[];

const prima = new PrismaClient();

export default class ProductRepository {
  protected static connectionDb: PrismaClient = InstanciaPrisma.GetConnection();

  // Definir o tipo de dado dos argumentos das funções.
  static async removerByIdProduct(id: number) {
    try {
      const removeProduct = await this.connectionDb.$transaction(async (tx) => {
        await tx.product.delete({ where: { id } });
        return "produto removido com sucesso";
      });
      return removeProduct;
    } catch (error) {
      throw error;
    }
  }
  static async getUniqueProduct(id: number) {
    try {
      const [productUnique]: productUnique = await this.connectionDb
        .$queryRaw`SELECT p.*,i.path FROM product p LEFT JOIN imagem AS i ON p.id_image = i.id WHERE p.id = ${id}`;
      console.log(productUnique);

      return productUnique;
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
