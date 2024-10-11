/*
  Warnings:

  - You are about to drop the `telefone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telefone` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `telefone` DROP FOREIGN KEY `telefone_UserId_fkey`;

-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `telefone`;
