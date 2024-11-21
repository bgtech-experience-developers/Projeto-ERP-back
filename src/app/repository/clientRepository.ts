import { InstanciaPrisma } from "../db/PrismaClient.js";


export class ClientRepository {

    async showCLients(){
        try{
            return await InstanciaPrisma.GetConnection().client.findMany({
                orderBy:{
                    id: 'desc'
                }
            })
        }catch(err){
            throw(err)
        }
    }

    async showClientById(id : any){
        try {
            return await InstanciaPrisma.GetConnection().client.findUnique({
                where: { id : id } 
            })
            
        } catch (err) {
            throw err
        }
    }

}
