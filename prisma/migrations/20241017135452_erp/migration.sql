-- DropForeignKey
ALTER TABLE "supplier_address" DROP CONSTRAINT "supplier_address_address_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_address" DROP CONSTRAINT "supplier_address_supllier_id_fkey";

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_supllier_id_fkey" FOREIGN KEY ("supllier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
