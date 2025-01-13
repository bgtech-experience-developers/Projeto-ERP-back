/*
  Warnings:

  - The primary key for the `supplier_pf_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `supplier_pf_address` table. All the data in the column will be lost.
  - You are about to drop the `ola` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_s` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tempory_tokenId` to the `adm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `supplier_pf_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `supplier_pf_Address_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `supplier_pf_Image_id_image_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `supplier_pf_Image_id_supplier_pf_fkey`;

-- AlterTable
ALTER TABLE `adm` ADD COLUMN `tempory_tokenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supplier_pf_address` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`id_address`, `id_supplier_pf`);

-- DropTable
DROP TABLE `ola`;

-- DropTable
DROP TABLE `test_s`;

-- CreateTable
CREATE TABLE `emails` (
    `id` INTEGER NOT NULL,
    `adm_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tempory_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adm_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `emails` ADD CONSTRAINT `emails_adm_id_fkey` FOREIGN KEY (`adm_id`) REFERENCES `adm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tempory_token` ADD CONSTRAINT `tempory_token_adm_id_fkey` FOREIGN KEY (`adm_id`) REFERENCES `adm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
