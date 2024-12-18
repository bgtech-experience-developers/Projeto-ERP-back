-- CreateTable
CREATE TABLE `Supplier_pj` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imagem` INTEGER NOT NULL,
    `name_supplier` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `date_birth` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Supplier_pj_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier_pj_Address` (
    `id_supplier_pj` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_supplier_pj`, `id_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supplier_pj` ADD CONSTRAINT `Supplier_pj_id_imagem_fkey` FOREIGN KEY (`id_imagem`) REFERENCES `imagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pj_Address` ADD CONSTRAINT `Supplier_pj_Address_id_supplier_pj_fkey` FOREIGN KEY (`id_supplier_pj`) REFERENCES `Supplier_pj`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pj_Address` ADD CONSTRAINT `Supplier_pj_Address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
