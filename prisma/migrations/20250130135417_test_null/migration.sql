/*
  Warnings:

  - Made the column `id_supplier_pf` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_supplier_pj` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_id_supplier_pj_fkey`;

-- DropIndex
DROP INDEX `product_id_supplier_pf_fkey` ON `product`;

-- DropIndex
DROP INDEX `product_id_supplier_pj_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `id_supplier_pf` INTEGER NOT NULL,
    MODIFY `id_supplier_pj` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_supplier_pj_fkey` FOREIGN KEY (`id_supplier_pj`) REFERENCES `supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
