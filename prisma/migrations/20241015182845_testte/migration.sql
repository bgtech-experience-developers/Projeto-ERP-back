-- CreateTable
CREATE TABLE `_muitos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_muitos_AB_unique`(`A`, `B`),
    INDEX `_muitos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_muitos` ADD CONSTRAINT `_muitos_A_fkey` FOREIGN KEY (`A`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_muitos` ADD CONSTRAINT `_muitos_B_fkey` FOREIGN KEY (`B`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
