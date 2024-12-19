/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Supplier_pf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Supplier_pf_cpf_key` ON `Supplier_pf`(`cpf`);
