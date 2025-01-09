/*
  Warnings:

  - You are about to drop the `supplier_pf_Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_pf_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_s` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `supplier_pf_Address` DROP FOREIGN KEY `supplier_pf_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_Address` DROP FOREIGN KEY `supplier_pf_Address_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_Image` DROP FOREIGN KEY `supplier_pf_Image_id_image_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_Image` DROP FOREIGN KEY `supplier_pf_Image_id_supplier_pf_fkey`;

-- DropTable
DROP TABLE `supplier_pf_Address`;

-- DropTable
DROP TABLE `supplier_pf_Image`;

-- DropTable
DROP TABLE `test_s`;

-- CreateTable
CREATE TABLE `supplier_pf_image` (
    `id_supplier_pf` INTEGER NOT NULL,
    `id_image` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_image`, `id_supplier_pf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier_pf_address` (
    `id_supplier_pf` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_address`, `id_supplier_pf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `supplier` VARCHAR(191) NOT NULL,
    `serie_number` INTEGER NOT NULL,
    `barcode` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `cost_value` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `width` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `length` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
