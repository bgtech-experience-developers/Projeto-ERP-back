/*
  Warnings:

  - Made the column `id_image` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_id_image_fkey`;

-- DropIndex
DROP INDEX `product_id_image_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `id_image` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
