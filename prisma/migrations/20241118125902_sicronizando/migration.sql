-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `corporate_reason` VARCHAR(100) NOT NULL,
    `fantasy_name` VARCHAR(100) NOT NULL,
    `branch_activity` VARCHAR(100) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `state_registration` VARCHAR(9) NOT NULL,
    `type_contribuition` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `cell_phone` VARCHAR(100) NOT NULL,
    `rg` VARCHAR(9) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sector_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(8) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `number` VARCHAR(100) NOT NULL,
    `complement` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `neighborhood` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adressId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adressId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectorId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_address` ADD CONSTRAINT `company_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `company_address` ADD CONSTRAINT `company_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_address` ADD CONSTRAINT `delivery_address_adressId_fkey` FOREIGN KEY (`adressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_contact` ADD CONSTRAINT `financial_contact_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
