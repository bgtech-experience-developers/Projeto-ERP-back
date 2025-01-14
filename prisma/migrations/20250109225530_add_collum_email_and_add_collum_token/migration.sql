/*
  Warnings:

  - Added the required column `email` to the `emails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `tempory_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emails` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tempory_token` ADD COLUMN `token` VARCHAR(191) NOT NULL;
