import { PrismaClient } from "@prisma/client";
import { InstanciaPrisma } from "../db/PrismaClient.js";
import { SupplierPj } from "../middleware/SupplierPjValidator.js";
import { imageFile } from "../controller/SupplierControllerPj.js";
import { filterSupplier } from "../service/SupplierPjService.js";
import e from "express";
export type SupplierFildsString = string | null;
export type SupplierFildsNumber = number | null;
export interface findSupplierById {
  id: SupplierFildsNumber;
  id_imagem: number;
  id_address: number;
  email: SupplierFildsString;
  phone: SupplierFildsString;
  answerable: SupplierFildsString;
  cnpj: SupplierFildsString;
  corporate_reason: SupplierFildsString;
  fantasy_name: SupplierFildsString;
  municipal_registration: SupplierFildsString;
  state_registration: SupplierFildsString;
  suframa_registration: SupplierFildsString;
  type_contribuition: SupplierFildsString;
  status: SupplierFildsNumber;
  cep: SupplierFildsString;
  street: SupplierFildsString;
  number: SupplierFildsString;
  complement: SupplierFildsString;
  city: SupplierFildsString;
  neighborhood: SupplierFildsString;
  state: SupplierFildsString;
  path: SupplierFildsString;
}
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
      const [registerSupplier] = (await this.connection
        .$queryRaw`SELECT s.*, a.*,i.*,p.id_address FROM supplier_pj s LEFT JOIN imagem AS i ON s.id_imagem = i.id LEFT JOIN supplier_pj_address AS p ON p.id_supplier = s.id LEFT JOIN address AS a ON p.id_address = a.id WHERE s.id = ${id}`) as findSupplierById[];

      return registerSupplier;
    } catch (error) {
      throw error;
    }
  }

  static async filterSupplier(
    { email, phone, corporate_reason, answerable }: filterSupplier,
    page: number,
    limit: number
  ) {
    try {
      return await this.connection
        .$queryRaw`SELECT p.email,p.phone,p.corporate_reason,p.answerable,p.id FROM supplier_pj p WHERE p.email LIKE ${email.contanis} or p.phone LIKE ${phone.contanis} or p.corporate_reason LIKE ${corporate_reason.contanis} or p.answerable LIKE ${answerable.contanis}`;
    } catch (error) {
      throw error;
    }
  }

  static async filterSupplierByStatus(
    { email, phone, corporate_reason, answerable }: filterSupplier,
    status: string | null,
    page: number,
    limit: number
  ) {
    try {
      return await this.connection
        .$queryRaw`SELECT p.email,p.phone,p.corporate_reason,p.answerable,p.id FROM supplier_pj p WHERE (p.email LIKE ${
        email.contanis
      } or p.phone LIKE ${phone.contanis} or p.corporate_reason LIKE ${
        corporate_reason.contanis
      } or p.answerable LIKE ${answerable.contanis}) AND p.status = ${
        status === "true" ? 1 : 0
      }`;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(page: number, limit: number) {
    try {
      const registerColaboraters = await this.connection
        .$queryRaw`SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM supplier_pj s LIMIT ${limit} OFFSET ${page}`;

      return registerColaboraters;
    } catch (error) {
      throw error;
    }
  }

  static getSuppliersByStatus(
    status: number,
    pageSized: number,
    limit: number
  ) {
    try {
      return this.connection
        .$queryRaw`SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM supplier_pj s WHERE s.status = ${status} limit ${pageSized} offset ${limit}`;
    } catch (error) {
      throw error;
    }
  }

  static async updateByIdSupplier(
    { pj, address }: SupplierPj,
    image: SupplierFildsString | SupplierFildsString[],
    supplierId: number,
    addressId: number,
    imagemId: number
  ) {
    try {
      return await this.connection.$transaction(async (tsx) => {
        await tsx.supplier_pj.update({
          where: { id: supplierId },
          data: { ...pj },
        });
        await tsx.address.update({
          where: { id: addressId },
          data: { ...address },
        });
        await tsx.imagem.update({
          where: { id: imagemId },
          data: { path: image instanceof Array ? image[0] : image },
        });
        return `fornecedor atualizado com Êxito`;
      });
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
        const supplier = await tsx.supplier_pj.create({
          data: { ...pj, id_imagem: imageId.id },
        });
        await tsx.supplier_pj_address.create({
          data: { id_address: addressId.id, id_supplier: supplier.id },
        });
        return "fornecedor cadastrado com sucesso";
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async removeSupplierByAddressAndImage(
    addressId: number,
    ImageId: number
  ) {
    try {
      const message = await this.connection.$transaction(async (tsx) => {
        await tsx.address.delete({ where: { id: addressId } });
        await tsx.imagem.delete({ where: { id: ImageId } });
        return `fornecedor deletado com sucesso`;
      });
      return message;
    } catch (error) {
      throw error;
    }
  }
}
