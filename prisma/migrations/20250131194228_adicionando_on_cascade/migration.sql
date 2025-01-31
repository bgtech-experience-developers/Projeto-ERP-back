-- DropForeignKey
ALTER TABLE `supplier_pf_product` DROP FOREIGN KEY `supplier_pf_product_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pf_product` DROP FOREIGN KEY `supplier_pf_product_id_supplier_pf_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_product` DROP FOREIGN KEY `supplier_pj_product_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `supplier_pj_product` DROP FOREIGN KEY `supplier_pj_product_id_supplier_pj_fkey`;

-- DropIndex
DROP INDEX `supplier_pf_product_id_supplier_pf_fkey` ON `supplier_pf_product`;

-- DropIndex
DROP INDEX `supplier_pj_product_id_supplier_pj_fkey` ON `supplier_pj_product`;

-- AddForeignKey
ALTER TABLE `supplier_pf_product` ADD CONSTRAINT `supplier_pf_product_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pf_product` ADD CONSTRAINT `supplier_pf_product_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `supplier_pf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pj_product` ADD CONSTRAINT `supplier_pj_product_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supplier_pj_product` ADD CONSTRAINT `supplier_pj_product_id_supplier_pj_fkey` FOREIGN KEY (`id_supplier_pj`) REFERENCES `supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
