-- DropForeignKey
ALTER TABLE "client_address" DROP CONSTRAINT "client_address_client_id_fkey";

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
