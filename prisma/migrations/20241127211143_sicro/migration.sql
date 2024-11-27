/*
  Warnings:

  - You are about to drop the column `photo` on the `sector` table. All the data in the column will be lost.
  - Made the column `cell_phone` on table `sector` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `sector` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sector` DROP COLUMN `photo`,
    MODIFY `cell_phone` VARCHAR(100) NOT NULL,
    MODIFY `cpf` VARCHAR(9) NOT NULL;
