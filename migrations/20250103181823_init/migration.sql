-- -- CreateTable
-- CREATE TABLE  `Client` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `corporate_reason` VARCHAR(100) NOT NULL,
--     `fantasy_name` VARCHAR(100) NULL,
--     `branch_activity` VARCHAR(100) NULL,
--     `cnpj` VARCHAR(14) NOT NULL,
--     `state_registration` VARCHAR(9) NULL,
--     `type_contribuition` VARCHAR(191) NULL,
--     `situation` BOOLEAN NOT NULL DEFAULT true,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- -- CREATE TABLE `sector` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(100) NULL,
--     `email` VARCHAR(100) NULL,
--     `phone` VARCHAR(100) NULL,
--     `cell_phone` VARCHAR(100) NULL,
--     `rg` VARCHAR(191) NULL,
--     `cpf` VARCHAR(11) NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `imagem` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `path` VARCHAR(191) NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Address` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `cep` VARCHAR(8) NULL,
--     `street` VARCHAR(100) NULL,
--     `number` VARCHAR(100) NULL,
--     `complement` VARCHAR(100) NULL,
--     `city` VARCHAR(100) NULL,
--     `neighborhood` VARCHAR(100) NULL,
--     `state` VARCHAR(191) NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Supplier_pj_address` (
--     `id_address` INTEGER NOT NULL,
--     `id_supplier` INTEGER NOT NULL,

--     PRIMARY KEY (`id_address`, `id_supplier`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Supplier_pf` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `supplier_name` VARCHAR(255) NOT NULL,
--     `supplier_code` VARCHAR(255) NOT NULL,
--     `email` VARCHAR(150) NOT NULL,
--     `phone` VARCHAR(20) NOT NULL,
--     `rg` VARCHAR(15) NOT NULL,
--     `cpf` VARCHAR(11) NOT NULL,
--     `birth_date` DATETIME(3) NULL,
--     `status` BOOLEAN NOT NULL DEFAULT false,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     UNIQUE INDEX `Supplier_pf_cpf_key`(`cpf`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Supplier_pf_Image` (
--     `id_supplier_pf` INTEGER NOT NULL,
--     `id_image` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id_image`, `id_supplier_pf`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Supplier_pf_Address` (
--     `id_supplier_pf` INTEGER NOT NULL,
--     `id_address` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id_address`, `id_supplier_pf`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Supplier_pj` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `id_imagem` INTEGER NOT NULL,
--     `corporate_reason` VARCHAR(191) NOT NULL,
--     `email` VARCHAR(191) NULL,
--     `phone` VARCHAR(191) NULL,
--     `fantasy_name` VARCHAR(191) NULL,
--     `cnpj` VARCHAR(14) NOT NULL,
--     `answerable` VARCHAR(191) NULL,
--     `state_registration` VARCHAR(191) NULL,
--     `type_contribuition` VARCHAR(191) NULL,
--     `municipal_registration` VARCHAR(191) NULL,
--     `suframa_registration` VARCHAR(191) NULL,
--     `status` BOOLEAN NOT NULL DEFAULT true,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     UNIQUE INDEX `Supplier_pj_cnpj_key`(`cnpj`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `company_address` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `adressId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `commercial_image` (
--     `imageId` INTEGER NOT NULL,
--     `commercial_contactId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`imageId`, `commercial_contactId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `image_company` (
--     `companyId` INTEGER NOT NULL,
--     `imageId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`companyId`, `imageId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `delivery_address` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `adressId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `financial_image` (
--     `imageId` INTEGER NOT NULL,
--     `financial_contactId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`imageId`, `financial_contactId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `financial_contact` (
--     `sectorId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`sectorId`, `clientId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `owner_partner_image` (
--     `imageId` INTEGER NOT NULL,
--     `owner_partnerId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`imageId`, `owner_partnerId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `owner_partner` (
--     `sectorId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`sectorId`, `clientId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `commercial_contact` (
--     `sectorId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`sectorId`, `clientId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `accounting_contact_image` (
--     `imageId` INTEGER NOT NULL,
--     `accounting_contactId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`imageId`, `accounting_contactId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `accounting_contact` (
--     `sectorId` INTEGER NOT NULL,
--     `clientId` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`sectorId`, `clientId`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Adm` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `cnpj` CHAR(14) NOT NULL,
--     `password` VARCHAR(191) NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     UNIQUE INDEX `Adm_cnpj_key`(`cnpj`),
--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `Role` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `role_name` VARCHAR(191) NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- CreateTable
-- CREATE TABLE `RoleAdm` (
--     `adm_id` INTEGER NOT NULL,
--     `role_id` INTEGER NOT NULL,
--     `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
--     `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

--     PRIMARY KEY (`adm_id`, `role_id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pj_address` ADD CONSTRAINT `Supplier_pj_address_id_supplier_fkey` FOREIGN KEY (`id_supplier`) REFERENCES `Supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pj_address` ADD CONSTRAINT `Supplier_pj_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pf_Image` ADD CONSTRAINT `Supplier_pf_Image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pf_Image` ADD CONSTRAINT `Supplier_pf_Image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `Supplier_pj` ADD CONSTRAINT `Supplier_pj_id_imagem_fkey` FOREIGN KEY (`id_imagem`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `company_address` ADD CONSTRAINT `company_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `company_address` ADD CONSTRAINT `company_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_commercial_contactId_fkey` FOREIGN KEY (`commercial_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `image_company` ADD CONSTRAINT `image_company_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `image_company` ADD CONSTRAINT `image_company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_financial_contactId_fkey` FOREIGN KEY (`financial_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_owner_partnerId_fkey` FOREIGN KEY (`owner_partnerId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `owner_partner` ADD CONSTRAINT `owner_partner_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `owner_partner` ADD CONSTRAINT `owner_partner_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `commercial_contact` ADD CONSTRAINT `commercial_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `commercial_contact` ADD CONSTRAINT `commercial_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_accounting_contactId_fkey` FOREIGN KEY (`accounting_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `accounting_contact` ADD CONSTRAINT `accounting_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `accounting_contact` ADD CONSTRAINT `accounting_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `RoleAdm` ADD CONSTRAINT `RoleAdm_adm_id_fkey` FOREIGN KEY (`adm_id`) REFERENCES `Adm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE `RoleAdm` ADD CONSTRAINT `RoleAdm_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
