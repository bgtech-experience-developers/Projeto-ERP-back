import { PrismaClient } from "@prisma/client";
import { photos } from "../utils/ApiPyhton.js";
import { InstanciaPrisma } from "../db/PrismaClient.js";
export class RepositoryImport {
  static connection: PrismaClient = InstanciaPrisma.GetConnection();
  static async setIntoDb(data: photos[]) {
    try {
      return Promise.all(
        data.map(async (cliente, index) => {
          if (cliente.empresa === "EM BRANCO") {
            return null;
          }
          return await this.transection(cliente);
        })
      );
    } catch (error) {
      throw error;
    }
  }
  static async transection(cliente: photos) {
    try {
      const result = this.connection.$transaction(async (tsx) => {
        const client = await tsx.client.create({
          data: {
            cnpj: cliente.cliente.cnpj,
            branch_activity: cliente.cliente.branch_activity,
            corporate_reason: cliente.cliente.corporate_reason,
            fantasy_name: cliente.cliente.fantasy_name,
            type_contribuition: cliente.cliente.type_contribuition,
          },
          select: { id: true },
        });
        const address_empire = await tsx.address.create({
          data: {
            cep: cliente.endereco_empresa.cep,
            city: cliente.endereco_empresa.city,
            complement: cliente.endereco_empresa.complement,
            neighborhood: cliente.endereco_empresa.neighborhood,
            state: cliente.endereco_empresa.state,
            street: cliente.endereco_empresa.street,
            number: cliente.endereco_empresa.number,
          },
        });
        const address_delivery = await tsx.address.create({
          data: {
            cep: cliente.endereco_entrega.cep,
            city: cliente.endereco_entrega.city,
            complement: cliente.endereco_entrega.complement,
            neighborhood: cliente.endereco_entrega.neighborhood,
            state: cliente.endereco_entrega.state,
            street: cliente.endereco_entrega.street,
            number: cliente.endereco_entrega.number,
          },
        });
        const sector_owern = await tsx.sector.create({
          data: { ...cliente.socio },
          select: { id: true },
        });
        const sector_commercial = await tsx.sector.create({
          data: { ...cliente.comercial },
          select: { id: true },
        });
        const sector_finance = await tsx.sector.create({
          data: { ...cliente.financeiro },
          select: { id: true },
        });
        const sector_accouting = await tsx.sector.create({
          data: { ...cliente.contabil },
          select: { id: true },
        });
        const image_socio = await tsx.imagem.create({
          data: { path: cliente.photoOwner },
        });
        const image_client = await tsx.imagem.create({
          data: { path: cliente.photoClient },
        });
        const image_accouting = await tsx.imagem.create({
          data: { path: cliente.photoAccouting },
        });
        const image_commercial = await tsx.imagem.create({
          data: { path: cliente.photoCommercial },
        });
        await tsx.delivery_address.create({
          data: { adressId: address_delivery.id, clientId: client.id },
        });
        await tsx.company_address.create({
          data: { adressId: address_empire.id, clientId: client.id },
        });
        await tsx.commercial_contact.create({
          data: { clientId: client.id, sectorId: sector_commercial.id },
        });
        await tsx.accounting_contact.create({
          data: { clientId: client.id, sectorId: sector_accouting.id },
        });
        await tsx.owner_partner.create({
          data: { clientId: client.id, sectorId: sector_owern.id },
        });
        await tsx.financial_contact.create({
          data: { clientId: client.id, sectorId: sector_finance.id },
        });
        await tsx.accounting_contact_image.create({
          data: {
            imageId: image_accouting.id,
            accounting_contactId: sector_accouting.id,
          },
        });
        await tsx.commercial_image.create({
          data: {
            imageId: image_commercial.id,
            commercial_contactId: sector_commercial.id,
          },
        });
        await tsx.owner_partner_image.create({
          data: { imageId: image_socio.id, owner_partnerId: sector_owern.id },
        });
        await tsx.image_company.create({
          data: { companyId: client.id, imageId: image_client.id },
        });
        return "Done";
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
