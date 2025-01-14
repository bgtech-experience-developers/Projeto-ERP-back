/*
  Warnings:

  - Added the required column `code` to the `tempory_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tempory_token` ADD COLUMN `code` VARCHAR(191) NOT NULL;
