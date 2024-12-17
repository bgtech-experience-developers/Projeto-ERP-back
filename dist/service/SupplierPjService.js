import { AllError } from "../error/AllError.js";
import { SupplierPjRespository } from "../repository/SupplierPjRepository.js";
import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { Sharp } from "../utils/sharp.js";
export class SuppplierPjService {
    static async setSupplier(supplierInfo, profileImage) {
        try {
            const existingSupplier = await SupplierPjRespository.findSupplierByCnpj(supplierInfo.pj.cnpj);
            if (existingSupplier) {
                await this.handleExistingImage(profileImage); //separação de responsabilidades no qual essa função tem a função de verificar se existe algum arquivo para ser removido
                throw new AllError("fornecedor ja registrado no sistema");
            }
            const imageUploadResult = profileImage
                ? await ApiPhpUtils([profileImage.path], "img_profile", [profileImage])
                : [null];
            return await SupplierPjRespository.setSupplier(supplierInfo, imageUploadResult);
        }
        catch (error) {
            throw error;
        }
    }
    static async handleExistingImage(image) {
        try {
            image
                ? Sharp.removeImagens([image])
                : "não há arquivos temporarios para serem removidos no servidor";
        }
        catch (error) {
            console.error("erro interno do servidor");
        }
    }
    static async getAll(limit, page, status, queryStatus = 1) {
        try {
            if (status) {
                queryStatus = status === "true" ? 1 : 0;
            }
            else {
                queryStatus = null;
            }
            return await SupplierPjRespository.getAll(queryStatus, page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    static async callhandleExistingImage(image) {
        this.handleExistingImage(image);
    }
}
