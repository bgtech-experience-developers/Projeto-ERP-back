/*
  Warnings:

  - You are about to drop the column `senha` on the `Adm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Adm" DROP COLUMN "senha",
ADD COLUMN     "password" VARCHAR NOT NULL DEFAULT '1';
