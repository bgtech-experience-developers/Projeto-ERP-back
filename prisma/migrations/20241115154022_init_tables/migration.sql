-- CreateTable
CREATE TABLE "Adm" (
    "id" SERIAL NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "senha" VARCHAR NOT NULL,

    CONSTRAINT "Adm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleAdm" (
    "adm_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "RoleAdm_pkey" PRIMARY KEY ("adm_id","role_id")
);

-- AddForeignKey
ALTER TABLE "RoleAdm" ADD CONSTRAINT "RoleAdm_adm_id_fkey" FOREIGN KEY ("adm_id") REFERENCES "Adm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAdm" ADD CONSTRAINT "RoleAdm_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
