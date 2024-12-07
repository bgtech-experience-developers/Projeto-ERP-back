/*
  Warnings:

  - Added the required column `clientId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `clientId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
