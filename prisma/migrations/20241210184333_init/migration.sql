-- CreateTable
CREATE TABLE `Supplier_pf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_name` VARCHAR(255) NOT NULL,
    `supplier_code` VARCHAR(255) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `rg` VARCHAR(15) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Supplier_pf_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `internal_code` VARCHAR(20) NOT NULL,
    `stock` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product_Supplier_pf` (
    `price` VARCHAR(40) NOT NULL,
    `purchase_tax` VARCHAR(40) NOT NULL,
    `delivery_time` VARCHAR(50) NOT NULL,
    `id_product` INTEGER NOT NULL,
    `id_supplier_pf` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_product`, `id_supplier_pf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier_pf_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_supplier_pf` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_Supplier_pf` ADD CONSTRAINT `Product_Supplier_pf_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Supplier_pf` ADD CONSTRAINT `Product_Supplier_pf_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_supplier_pf_fkey` FOREIGN KEY (`id_supplier_pf`) REFERENCES `Supplier_pf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supplier_pf_Address` ADD CONSTRAINT `Supplier_pf_Address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
