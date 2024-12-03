-- DropForeignKey
ALTER TABLE `accounting_contact_image` DROP FOREIGN KEY `accounting_contact_image_accounting_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `accounting_contact_image` DROP FOREIGN KEY `accounting_contact_image_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `commercial_image` DROP FOREIGN KEY `commercial_image_commercial_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `commercial_image` DROP FOREIGN KEY `commercial_image_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `financial_image` DROP FOREIGN KEY `financial_image_financial_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `financial_image` DROP FOREIGN KEY `financial_image_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `owner_partner_image` DROP FOREIGN KEY `owner_partner_image_imageId_fkey`;

-- DropForeignKey
ALTER TABLE `owner_partner_image` DROP FOREIGN KEY `owner_partner_image_owner_partnerId_fkey`;

-- DropForeignKey
ALTER TABLE `roleadm` DROP FOREIGN KEY `RoleAdm_adm_id_fkey`;

-- DropForeignKey
ALTER TABLE `roleadm` DROP FOREIGN KEY `RoleAdm_role_id_fkey`;

-- AddForeignKey
ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_commercial_contactId_fkey` FOREIGN KEY (`commercial_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_financial_contactId_fkey` FOREIGN KEY (`financial_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_owner_partnerId_fkey` FOREIGN KEY (`owner_partnerId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_accounting_contactId_fkey` FOREIGN KEY (`accounting_contactId`) REFERENCES `sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleAdm` ADD CONSTRAINT `RoleAdm_adm_id_fkey` FOREIGN KEY (`adm_id`) REFERENCES `Adm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleAdm` ADD CONSTRAINT `RoleAdm_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
