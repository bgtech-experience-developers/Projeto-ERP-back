/*
  Warnings:

  - You are about to drop the `_muitos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_muitos` DROP FOREIGN KEY `_muitos_A_fkey`;

-- DropForeignKey
ALTER TABLE `_muitos` DROP FOREIGN KEY `_muitos_B_fkey`;

-- DropTable
DROP TABLE `_muitos`;
