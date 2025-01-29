/*
  Warnings:

  - You are about to drop the column `supplier` on the `product` table. All the data in the column will be lost.
  - Added the required column `supplier_name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `supplier`,
    ADD COLUMN `id_supplier_pf` INTEGER NULL,
    ADD COLUMN `id_supplier_pj` INTEGER NULL,
    ADD COLUMN `supplier_name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_supplier_pj_fkey` FOREIGN KEY (`id_supplier_pj`) REFERENCES `supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
