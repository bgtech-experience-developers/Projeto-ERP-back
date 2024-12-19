-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `Supplier_pf_Address_id_address_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_address` DROP FOREIGN KEY `Supplier_pf_Address_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `Supplier_pf_Image_id_image_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_image` DROP FOREIGN KEY `Supplier_pf_Image_id_supplier_pf_fkey`;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Image` ADD CONSTRAINT `Supplier_pf_Image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Image` ADD CONSTRAINT `Supplier_pf_Image_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
