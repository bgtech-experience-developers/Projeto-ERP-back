-- DropForeignKey
ALTER TABLE "RoleAdm" DROP CONSTRAINT "RoleAdm_adm_id_fkey";

-- DropForeignKey
ALTER TABLE "RoleAdm" DROP CONSTRAINT "RoleAdm_role_id_fkey";

-- AddForeignKey
ALTER TABLE "RoleAdm" ADD CONSTRAINT "RoleAdm_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "Adm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAdm" ADD CONSTRAINT "RoleAdm_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
