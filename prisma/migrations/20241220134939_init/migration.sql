/*
  Warnings:

  - A unique constraint covering the columns `[id_supplier_pf]` on the table `Supplier_pf_Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Supplier_pf_Address_id_supplier_pf_key` ON `Supplier_pf_Address`(`id_supplier_pf`);
