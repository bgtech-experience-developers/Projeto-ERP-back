/*
  Warnings:

  - The primary key for the `supplier_pf_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `supplier_pf_address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `roleadm` DROP FOREIGN KEY `RoleAdm_adm_id_fkey`;

-- DropForeignKey
ALTER TABLE `roleadm` DROP FOREIGN KEY `RoleAdm_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `Supplier_pf_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `Supplier_pf_Address_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `Supplier_pf_Image_id_image_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `Supplier_pf_Image_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj` DROP FOREIGN KEY `Supplier_pj_id_imagem_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_address` DROP FOREIGN KEY `Supplier_pj_address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_address` DROP FOREIGN KEY `Supplier_pj_address_id_supplier_fkey`;

-- AlterTable
ALTER TABLE `client` MODIFY `corporate_reason` VARCHAR(1000) NOT NULL,
    MODIFY `fantasy_name` VARCHAR(1000) NULL,
    MODIFY `branch_activity` VARCHAR(1000) NULL,
    MODIFY `state_registration` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `sector` MODIFY `name` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `supplier_pf` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `supplier_pf_address` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`id_address`, `id_supplier_pf`);

-- AddForeignKey
ALTER TABLE `supplier_pj` ADD CONSTRAINT `supplier_pj_id_imagem_fkey` FOREIGN KEY (`id_imagem`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pj_address` ADD CONSTRAINT `supplier_pj_address_id_supplier_fkey` FOREIGN KEY (`id_supplier`) REFERENCES `supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pj_address` ADD CONSTRAINT `supplier_pj_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_Image` ADD CONSTRAINT `supplier_pf_Image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_Image` ADD CONSTRAINT `supplier_pf_Image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roleadm` ADD CONSTRAINT `roleadm_adm_id_fkey` FOREIGN KEY (`adm_id`) REFERENCES `adm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roleadm` ADD CONSTRAINT `roleadm_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `adm_cnpj_key` ON `adm`(`cnpj`);
DROP INDEX `Adm_cnpj_key` ON `adm`;

-- RedefineIndex
CREATE UNIQUE INDEX `supplier_pf_cpf_key` ON `supplier_pf`(`cpf`);
DROP INDEX `Supplier_pf_cpf_key` ON `supplier_pf`;

-- RedefineIndex
CREATE UNIQUE INDEX `supplier_pj_cnpj_key` ON `supplier_pj`(`cnpj`);
DROP INDEX `Supplier_pj_cnpj_key` ON `supplier_pj`;
