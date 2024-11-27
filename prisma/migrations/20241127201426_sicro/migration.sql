/*
  Warnings:

  - You are about to drop the column `imageId` on the `accounting_contact` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `commercial_contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accounting_contact` DROP COLUMN `imageId`;

-- AlterTable
ALTER TABLE `commercial_contact` DROP COLUMN `imageId`;
