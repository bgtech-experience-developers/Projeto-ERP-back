-- DropForeignKey
ALTER TABLE "client_address" DROP CONSTRAINT "client_address_address_id_fkey";

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
