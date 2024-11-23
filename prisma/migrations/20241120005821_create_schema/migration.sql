-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "corporate_reason" VARCHAR(100) NOT NULL,
    "fantasy_name" VARCHAR(100) NOT NULL,
    "branch_activity" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "state_registration" VARCHAR(9) NOT NULL,
    "type_contribuition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sector" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "cell_phone" VARCHAR(100),
    "rg" VARCHAR(9) NOT NULL,
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "neighborhood" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_address" (
    "id" SERIAL NOT NULL,
    "adressId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_address" (
    "id" SERIAL NOT NULL,
    "adressId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_contact" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_partner" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "owner_partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commercial_contact" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commercial_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting_contact" (
    "id" SERIAL NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounting_contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sector_email_key" ON "sector"("email");

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_address" ADD CONSTRAINT "company_address_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_address" ADD CONSTRAINT "delivery_address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_address" ADD CONSTRAINT "delivery_address_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_contact" ADD CONSTRAINT "financial_contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_contact" ADD CONSTRAINT "financial_contact_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_partner" ADD CONSTRAINT "owner_partner_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_partner" ADD CONSTRAINT "owner_partner_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commercial_contact" ADD CONSTRAINT "commercial_contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commercial_contact" ADD CONSTRAINT "commercial_contact_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_contact" ADD CONSTRAINT "accounting_contact_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_contact" ADD CONSTRAINT "accounting_contact_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
