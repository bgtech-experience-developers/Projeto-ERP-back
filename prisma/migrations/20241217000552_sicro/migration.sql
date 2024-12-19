/*
  Warnings:

  - You are about to drop the `supplier_pj_address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_address` to the `Supplier_pj` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `supplier_pj` DROP FOREIGN KEY `Supplier_pj_id_imagem_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_address` DROP FOREIGN KEY `Supplier_pj_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_address` DROP FOREIGN KEY `Supplier_pj_Address_id_supplier_pj_fkey`;

-- AlterTable
ALTER TABLE `supplier_pj` ADD COLUMN `id_address` INTEGER NOT NULL;

-- DropTable
DROP TABLE `supplier_pj_address`;

-- AddForeignKey
ALTER TABLE `Supplier_pj` ADD CONSTRAINT `Supplier_pj_id_imagem_fkey` FOREIGN KEY (`id_imagem`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pj` ADD CONSTRAINT `Supplier_pj_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
