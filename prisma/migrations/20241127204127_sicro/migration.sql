/*
  Warnings:

  - You are about to drop the column `photo` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `client` DROP COLUMN `photo`;

-- AlterTable
ALTER TABLE `sector` MODIFY `cpf` VARCHAR(191) NULL;
