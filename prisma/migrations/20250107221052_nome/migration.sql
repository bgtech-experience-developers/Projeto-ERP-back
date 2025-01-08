-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `supplier_pf_Image_id_image_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `supplier_pf_Image_id_supplier_pf_fkey`;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_image` ADD CONSTRAINT `supplier_pf_image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
