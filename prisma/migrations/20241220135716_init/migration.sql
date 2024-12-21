/*
  Warnings:

  - The primary key for the `supplier_pf_address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `supplier_pf_address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `supplier_pf_address` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`id_address`, `id_supplier_pf`);
