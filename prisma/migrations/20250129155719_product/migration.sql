-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_image` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `supplier` VARCHAR(191) NOT NULL,
    `serie_number` INTEGER NOT NULL,
    `barcode` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `cost_value` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `width` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `length` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `product_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_id_image_fkey` FOREIGN KEY (`id_image`) REFERENCES `imagem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
