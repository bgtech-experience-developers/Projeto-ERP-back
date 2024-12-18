/*
  Warnings:

  - You are about to drop the column `id_address` on the `supplier_pj` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `supplier_pj` DROP FOREIGN KEY `Supplier_pj_id_address_fkey`;

-- AlterTable
ALTER TABLE `supplier_pj` DROP COLUMN `id_address`;

-- CreateTable
CREATE TABLE `Supplier_pj_address` (
    `id_address` INTEGER NOT NULL,
    `id_supplier` INTEGER NOT NULL,

    PRIMARY KEY (`id_address`, `id_supplier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supplier_pj_address` ADD CONSTRAINT `Supplier_pj_address_id_supplier_fkey` FOREIGN KEY (`id_supplier`) REFERENCES `Supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pj_address` ADD CONSTRAINT `Supplier_pj_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
