import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const insert = await prisma.adm.create({
    data: {
        cnpj: "12345678911111",
        senha: "1233",
        role_adm: {
            create: [
                {role: {connect: {id: 1}}}
            ]
    }
}})

console.log(insert);
