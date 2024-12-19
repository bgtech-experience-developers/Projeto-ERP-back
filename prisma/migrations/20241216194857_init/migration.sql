/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_supplier_pf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_supplier_pf` DROP FOREIGN KEY `Product_Supplier_pf_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `product_supplier_pf` DROP FOREIGN KEY `Product_Supplier_pf_id_supplier_pf_fkey`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `product_supplier_pf`;
