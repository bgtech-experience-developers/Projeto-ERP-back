/*
  Warnings:

  - The primary key for the `accounting_contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `accounting_contact` table. All the data in the column will be lost.
  - You are about to drop the column `situtation` on the `client` table. All the data in the column will be lost.
  - The primary key for the `commercial_contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `commercial_contact` table. All the data in the column will be lost.
  - The primary key for the `financial_contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `financial_contact` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `imagem` table. All the data in the column will be lost.
  - The primary key for the `owner_partner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `owner_partner` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `accounting_contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `commercial_contact` table without a default value. This is not possible if the table is not empty.
  - Made the column `cell_phone` on table `sector` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `sector_cpf_key` ON `sector`;

-- AlterTable
ALTER TABLE `accounting_contact` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `imageId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`sectorId`, `clientId`);

-- AlterTable
ALTER TABLE `client` DROP COLUMN `situtation`,
    ADD COLUMN `situation` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `commercial_contact` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `imageId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`sectorId`, `clientId`);

-- AlterTable
ALTER TABLE `financial_contact` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`sectorId`, `clientId`);

-- AlterTable
ALTER TABLE `imagem` DROP COLUMN `link`,
    MODIFY `path` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `owner_partner` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`sectorId`, `clientId`);

-- AlterTable
ALTER TABLE `sector` MODIFY `phone` VARCHAR(100) NULL,
    MODIFY `cell_phone` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `commercial_image` (
    `imageId` INTEGER NOT NULL,
    `commercial_contactId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`, `commercial_contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image_company` (
    `companyId` INTEGER NOT NULL,
    `imageId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`companyId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_image` (
    `imageId` INTEGER NOT NULL,
    `financial_contactId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`, `financial_contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owner_partner_image` (
    `imageId` INTEGER NOT NULL,
    `owner_partnerId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`, `owner_partnerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounting_contact_image` (
    `imageId` INTEGER NOT NULL,
    `accounting_contactId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`, `accounting_contactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_commercial_contactId_fkey` FOREIGN KEY (`commercial_contactId`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commercial_image` ADD CONSTRAINT `commercial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_company` ADD CONSTRAINT `image_company_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_company` ADD CONSTRAINT `image_company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_image` ADD CONSTRAINT `financial_image_financial_contactId_fkey` FOREIGN KEY (`financial_contactId`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owner_partner_image` ADD CONSTRAINT `owner_partner_image_owner_partnerId_fkey` FOREIGN KEY (`owner_partnerId`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_accounting_contactId_fkey` FOREIGN KEY (`accounting_contactId`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounting_contact_image` ADD CONSTRAINT `accounting_contact_image_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
