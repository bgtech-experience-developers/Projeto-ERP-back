/*
  Warnings:

  - You are about to drop the column `address` on the `supplier_address` table. All the data in the column will be lost.
  - You are about to drop the column `supllier` on the `supplier_address` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `supplier_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supllier_id` to the `supplier_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplier_address" DROP CONSTRAINT "supplier_address_address_fkey";

-- DropForeignKey
ALTER TABLE "supplier_address" DROP CONSTRAINT "supplier_address_supllier_fkey";

-- AlterTable
ALTER TABLE "supplier_address" DROP COLUMN "address",
DROP COLUMN "supllier",
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "supllier_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_supllier_id_fkey" FOREIGN KEY ("supllier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
