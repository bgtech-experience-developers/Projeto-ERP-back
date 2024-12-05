-- AlterTable
ALTER TABLE `imagem` ADD COLUMN `client_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `imagem` ADD CONSTRAINT `imagem_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
