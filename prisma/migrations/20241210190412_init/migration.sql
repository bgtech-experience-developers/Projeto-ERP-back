-- CreateTable
CREATE TABLE `Supplier_pf_Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_supplier_pf` INTEGER NOT NULL,
    `id_image` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Image` ADD CONSTRAINT `Supplier_pf_Image_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
