-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT,
    "cell_phone" TEXT,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "type" TEXT,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "situation" BOOLEAN NOT NULL DEFAULT false,
    "telefone" TEXT,
    "celular" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "date_of_birthday" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "situation" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "cell_phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_address" (
    "id" SERIAL NOT NULL,
    "supllier_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "supplier_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_address" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "client_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_address" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "employee_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_cpf_key" ON "employee"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_cpf_key" ON "supplier"("cpf");

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_supllier_id_fkey" FOREIGN KEY ("supllier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_address" ADD CONSTRAINT "supplier_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_address" ADD CONSTRAINT "employee_address_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_address" ADD CONSTRAINT "employee_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;
