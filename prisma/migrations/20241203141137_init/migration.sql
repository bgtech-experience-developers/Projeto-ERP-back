-- DropForeignKey
ALTER TABLE `accounting_contact` DROP FOREIGN KEY `accounting_contact_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `accounting_contact` DROP FOREIGN KEY `accounting_contact_sectorId_fkey`;

-- DropForeignKey
ALTER TABLE `commercial_contact` DROP FOREIGN KEY `commercial_contact_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `commercial_contact` DROP FOREIGN KEY `commercial_contact_sectorId_fkey`;

-- DropForeignKey
ALTER TABLE `company_address` DROP FOREIGN KEY `company_address_adressId_fkey`;

-- DropForeignKey
ALTER TABLE `company_address` DROP FOREIGN KEY `company_address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `delivery_address` DROP FOREIGN KEY `delivery_address_adressId_fkey`;

-- DropForeignKey
ALTER TABLE `delivery_address` DROP FOREIGN KEY `delivery_address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `financial_contact` DROP FOREIGN KEY `financial_contact_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `financial_contact` DROP FOREIGN KEY `financial_contact_sectorId_fkey`;

-- DropForeignKey
ALTER TABLE `image_company` DROP FOREIGN KEY `image_company_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `image_company` DROP FOREIGN KEY `image_company_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `owner_partner` DROP FOREIGN KEY `owner_partner_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `owner_partner` DROP FOREIGN KEY `owner_partner_sectorId_fkey`;

-- AddForeignKey
ALTER TABLE `company_address` ADD CONSTRAINT `company_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_address` ADD CONSTRAINT `company_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_company` ADD CONSTRAINT `image_company_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_company` ADD CONSTRAINT `image_company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner` ADD CONSTRAINT `owner_partner_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner` ADD CONSTRAINT `owner_partner_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_contact` ADD CONSTRAINT `commercial_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_contact` ADD CONSTRAINT `commercial_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact` ADD CONSTRAINT `accounting_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact` ADD CONSTRAINT `accounting_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
