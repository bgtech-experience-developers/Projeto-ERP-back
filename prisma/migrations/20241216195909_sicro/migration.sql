/*
  Warnings:

  - You are about to drop the column `cpf` on the `supplier_pj` table. All the data in the column will be lost.
  - You are about to drop the column `date_birth` on the `supplier_pj` table. All the data in the column will be lost.
  - You are about to drop the column `name_supplier` on the `supplier_pj` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `supplier_pj` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Supplier_pj` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `Supplier_pj` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corporate_reason` to the `Supplier_pj` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Supplier_pj_cpf_key` ON `supplier_pj`;

-- AlterTable
ALTER TABLE `supplier_pj` DROP COLUMN `cpf`,
    DROP COLUMN `date_birth`,
    DROP COLUMN `name_supplier`,
    DROP COLUMN `rg`,
    ADD COLUMN `answerable` VARCHAR(191) NULL,
    ADD COLUMN `cnpj` VARCHAR(14) NOT NULL,
    ADD COLUMN `corporate_reason` VARCHAR(191) NOT NULL,
    ADD COLUMN `fantasy_name` VARCHAR(191) NULL,
    ADD COLUMN `municipal_registration` VARCHAR(191) NULL,
    ADD COLUMN `state_registration` VARCHAR(191) NULL,
    ADD COLUMN `suframa_registration` VARCHAR(191) NULL,
    ADD COLUMN `type_contribuition` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_pj_cnpj_key` ON `Supplier_pj`(`cnpj`);
