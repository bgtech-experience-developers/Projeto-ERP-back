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
        .$queryRaw`SELECT s.*, a.*,i.*,p.id_address FROM Supplier_pj s LEFT JOIN erp.imagem AS i ON s.id_imagem = i.id LEFT JOIN erp.Supplier_pj_address AS p ON p.id_supplier = s.id LEFT JOIN erp.Address AS a ON p.id_address = a.id WHERE s.id = ${id}`) as findSupplierById[];

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
      return await this.connection.supplier_pj.findMany({
        where: {
          OR: [
            { email: email.contanis },
            { phone: phone.contanis },
            { corporate_reason: corporate_reason.contanis },
            { answerable: answerable.contanis },
          ],
        },
        select: {
          email: true,
          phone: true,
          corporate_reason: true,
          answerable: true,
        },
        skip: page,
        take: limit,
      });
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
      return await this.connection.supplier_pj.findMany({
        where: {
          OR: [
            { email: email.contanis },
            { phone: phone.contanis },
            { corporate_reason: corporate_reason.contanis },
            { answerable: answerable.contanis },
          ],
          AND: { status: status === "true" ? true : false },
        },
        select: {
          email: true,
          phone: true,
          corporate_reason: true,
          answerable: true,
        },
        skip: page,
        take: limit,
      });
    } catch (error) {
      throw error;
    }
  }
  static async getAll(page: number, limit: number) {
    try {
      const registerColaboraters = await this.connection
        .$queryRaw`SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM Supplier_pj s `;

      // const registerColaboraters = await this.connection.supplier_pj.findMany({
      //   select: {
      //     corporate_reason: true,
      //     email: true,
      //     phone: true,
      //     answerable: true,
      //   },
      // }); aqui estou utililizandio o prisma pois caso troque de sgbd a orm se encarrega de converter o codigo para que haja uma compatiblidad3 com esse novo sgbd , vantagem de utilizar uma orm

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
        .$queryRaw`SELECT s.phone,s.email,s.corporate_reason,s.answerable,s.id FROM Supplier_pj s WHERE s.status = ${status}`;
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
