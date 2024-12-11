/*
  Warnings:

  - You are about to drop the column `clientId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `imagem` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `sector` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `imagem` DROP FOREIGN KEY `imagem_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `sector` DROP FOREIGN KEY `sector_client_id_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `clientId`;

-- AlterTable
ALTER TABLE `imagem` DROP COLUMN `client_id`;

-- AlterTable
ALTER TABLE `sector` DROP COLUMN `client_id`;
