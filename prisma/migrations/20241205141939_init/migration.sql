-- AlterTable
ALTER TABLE `sector` ADD COLUMN `client_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `sector` ADD CONSTRAINT `sector_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
