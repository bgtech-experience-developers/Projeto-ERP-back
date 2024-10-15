import { instanciaPrisma } from "../database/conexao.js";


export class employeerRepository{
    async showAllEmployeer(){
        try{
            return await instanciaPrisma.employee.findMany()
        }catch(error){
            throw new Error(error)
        }
    }

    async createEmployeer(employeerData){
        const {name, email, cpf, employee_address, phone, cell_phone} = employeerData
        try {
            const employeer = await instanciaPrisma.employee.create({
                data: {name, email, cpf, employee_address, phone, cell_phone}
            })
            const message = 'fornecedor cadastrado com sucesso'
            return({
                employeer,
                message
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}