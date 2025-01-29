import { AllError } from "../error/AllError.js";
import { deleteUpload } from "../middleware/ApiPhp.js";
import { SupplierPjRespository, } from "../repository/SupplierPjRepository.js";
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
    static async getByIdSupplier(id) {
        try {
            const existingSupplier = await SupplierPjRespository.findSupplierById(id);
            if (!existingSupplier) {
                throw new AllError("registro não encontrado no sistema", 400);
            }
            return existingSupplier;
        }
        catch (error) {
            throw error;
        }
    }
    static async getAll(limit, page, status) {
        try {
            return status
                ? await this.getSuppliersByStatus(status, page, limit)
                : await SupplierPjRespository.getAll(page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    static async callhandleExistingImage(image) {
        this.handleExistingImage(image);
    }
    static async getSuppliersByStatus(Status, pageSized, limit) {
        try {
            const filterStatus = Status === "true" ? 1 : 0;
            return await SupplierPjRespository.getSuppliersByStatus(filterStatus, pageSized, limit);
        }
        catch (error) {
            throw error;
        }
    }
    static async removeUpload(path) {
        try {
            path = path.replace("https://bgtech.com.br/erp/assets/", "");
            const data = await deleteUpload([path]);
            console.log(data);
        }
        catch (error) {
            throw error;
        }
    }
    static async removeByIdSupplier(id) {
        try {
            console.log(id);
            const existingRegister = await SupplierPjRespository.findSupplierById(id);
            if (!existingRegister) {
                throw new AllError("fornecedor não encontrado no sistema", 400);
            }
            const message = await SupplierPjRespository.removeSupplierByAddressAndImage(existingRegister.id_address, existingRegister.id_imagem);
            existingRegister.path ? this.removeUpload(existingRegister.path) : "";
            return message;
        }
        catch (error) {
            throw error;
        }
    }
    static async updateSupplier(supplierInfo, profileImage, SupplierId) {
        try {
            console.log(SupplierId);
            const existingRegister = await SupplierPjRespository.findSupplierById(SupplierId);
            if (!existingRegister) {
                this.handleExistingImage(profileImage);
                throw new AllError("não foi possível atualizar o fornecedor pois não consta no sistema");
            }
            const profileImageUpload = profileImage
                ? await this.handleSupplierImageUpload(profileImage, existingRegister.path)
                : existingRegister.path;
            // existingRegister.path  ? this.removeUpload(existingRegister.path) : ''
            return await SupplierPjRespository.updateByIdSupplier(supplierInfo, profileImageUpload, SupplierId, existingRegister.id_address, existingRegister.id_imagem);
        }
        catch (error) {
            throw error;
        }
    }
    static async handleSupplierImageUpload(files, path) {
        try {
            path ? this.removeUpload(path) : "";
            return await ApiPhpUtils([files.path], "img_profile", [files]);
        }
        catch (error) {
            throw error;
        }
    }
    static async filterSupplier(page, limit, status, value) {
        try {
            const filterCondition = this.FilterContains(value, [
                "answerable",
                "corporate_reason",
                "email",
                "phone",
            ]);
            return status
                ? await SupplierPjRespository.filterSupplierByStatus(filterCondition, status, page, limit)
                : await SupplierPjRespository.filterSupplier(filterCondition, page, limit);
        }
        catch (error) {
            throw error;
        }
    }
    static FilterContains(value, fields) {
        const filter = {
            answerable: { contanis: "" },
            corporate_reason: { contanis: "" },
            email: { contanis: "" },
            phone: { contanis: "" },
        };
        fields.forEach((field, index) => {
            filter[field] = { contanis: `%${value}%` };
        });
        return filter;
    }
}
