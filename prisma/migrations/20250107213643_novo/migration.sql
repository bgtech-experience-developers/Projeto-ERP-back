/*
  Warnings:

  - The primary key for the `supplier_pf_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `supplier_pf_address` table. All the data in the column will be lost.
  - You are about to drop the `test_s` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `supplier_pf_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `supplier_pf_Address_id_supplier_pf_fkey`;

-- AlterTable
ALTER TABLE `supplier_pf` MODIFY `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `supplier_pf_address` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`id_address`, `id_supplier_pf`);

-- DropTable
DROP TABLE `test_s`;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_address` ADD CONSTRAINT `supplier_pf_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
