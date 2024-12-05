-- DropForeignKey
ALTER TABLE `sector` DROP FOREIGN KEY `sector_client_id_fkey`;

-- AddForeignKey
ALTER TABLE `sector` ADD CONSTRAINT `sector_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
