import sharp from "sharp";
import { imageFile } from "../controller/SupplierControllerPj.js";
import { AllError } from "../error/AllError.js";
import { ApiPhp, deleteUpload } from "../middleware/ApiPhp.js";
import { SupplierPj } from "../middleware/SupplierPjValidator.js";
import {
  SupplierFildsString,
  SupplierPjRespository,
} from "../repository/SupplierPjRepository.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { Sharp } from "../utils/sharp.js";

export class SuppplierPjService {
  static async setSupplier(supplierInfo: SupplierPj, profileImage: imageFile) {
    try {
      const existingSupplier = await SupplierPjRespository.findSupplierByCnpj(
        supplierInfo.pj.cnpj
      );
      if (existingSupplier) {
        await this.handleExistingImage(profileImage); //separação de responsabilidades no qual essa função tem a função de verificar se existe algum arquivo para ser removido
        throw new AllError("fornecedor ja registrado no sistema");
      }
      const imageUploadResult = profileImage
        ? await ApiPhpUtils([profileImage.path], "img_profile", [profileImage])
        : [null];
      return await SupplierPjRespository.setSupplier(
        supplierInfo,
        imageUploadResult
      );
    } catch (error) {
      throw error;
    }
  }
  protected static async handleExistingImage(image: imageFile) {
    try {
      image
        ? Sharp.removeImagens([image])
        : "não há arquivos temporarios para serem removidos no servidor";
    } catch (error) {
      console.error("erro interno do servidor");
    }
  }
  static async getByIdSupplier(id: number) {
    try {
      const existingSupplier = await SupplierPjRespository.findSupplierById(id);
      if (!existingSupplier) {
        throw new AllError("registro não encontrado no sistema", 400);
      }
      return existingSupplier;
    } catch (error) {
      throw error;
    }
  }
  static async getAll(limit: number, page: number, status: string | null) {
    try {
      return status
        ? await this.getSuppliersByStatus(status, page, limit)
        : await SupplierPjRespository.getAll(page, limit);
    } catch (error) {
      throw error;
    }
  }
  public static async callhandleExistingImage(image: imageFile) {
    this.handleExistingImage(image);
  }
  private static async getSuppliersByStatus(
    Status: string,
    pageSized: number,
    limit: number
  ) {
    try {
      const filterStatus = Status === "true" ? 1 : 0;
      return await SupplierPjRespository.getSuppliersByStatus(
        filterStatus,
        pageSized,
        limit
      );
    } catch (error) {
      throw error;
    }
  }
  private static async removeUpload(path: string) {
    try {
      path = path.replace("https://bgtech.com.br/erp/assets/", "");
      const data = await deleteUpload([path]);
      console.log(data);
    } catch (error) {
      throw error;
    }
  }
  static async removeByIdSupplier(id: number) {
    try {
      const existingRegister = await SupplierPjRespository.findSupplierById(id);
      if (!existingRegister) {
        throw new AllError("fornecedor não encontrado no sistema", 400);
      }
      const message =
        await SupplierPjRespository.removeSupplierByAddressAndImage(
          existingRegister.id_address,
          existingRegister.id_imagem
        );
      existingRegister.path ? this.removeUpload(existingRegister.path) : "";
      return message;
    } catch (error) {
      throw error;
    }
  }
  static async updateSupplier(
    supplierInfo: SupplierPj,
    profileImage: imageFile,
    SupplierId: number
  ) {
    try {
      console.log(SupplierId);
      const existingRegister = await SupplierPjRespository.findSupplierById(
        SupplierId
      );
      if (!existingRegister) {
        this.handleExistingImage(profileImage);
        throw new AllError(
          "não foi possível atualizar o fornecedor pois não consta no sistema"
        );
      }
      const profileImageUpload = profileImage
        ? await this.handleSupplierImageUpload(
            profileImage,
            existingRegister.path
          )
        : existingRegister.path;
      // existingRegister.path  ? this.removeUpload(existingRegister.path) : ''
      return await SupplierPjRespository.updateByIdSupplier(
        supplierInfo,
        profileImageUpload,
        SupplierId,
        existingRegister.id_address,
        existingRegister.id_imagem
      );
    } catch (error) {
      throw error;
    }
  }
  private static async handleSupplierImageUpload(
    files: Express.Multer.File,
    path: SupplierFildsString
  ) {
    try {
      path ? this.removeUpload(path) : "";
      return await ApiPhpUtils([files.path], "img_profile", [files]);
    } catch (error) {
      throw error;
    }
  }
}
