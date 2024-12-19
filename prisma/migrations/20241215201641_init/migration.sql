/*
  Warnings:

  - The primary key for the `product_supplier_pf` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `product_supplier_pf` DROP FOREIGN KEY `Product_Supplier_pf_id_product_fkey`;

-- AlterTable
ALTER TABLE `product_supplier_pf` DROP PRIMARY KEY,
    MODIFY `id_product` INTEGER NULL,
    ADD PRIMARY KEY (`id_supplier_pf`);

-- AddForeignKey
ALTER TABLE `Product_Supplier_pf` ADD CONSTRAINT `Product_Supplier_pf_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
