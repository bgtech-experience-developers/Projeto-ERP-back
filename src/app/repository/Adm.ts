import { Prisma } from "../connection/Prisma.js";
class AdmRepository {
    async create(data: Adm) {

        try {
            const prisma = await Prisma.connection();
            const create = await prisma.adm.create({
                data: {
                    cnpj: data.cnpj,
                    password: data.password,
                    role_adm: {
                        create: [
                            // Aqui o id seria oque faz a referencia a tabela de role
                            {role: {connect: {id: data.id}}}
                        ]
                    }
                }
            })
            
        }
        catch(error) {
            
        }
    } 
}