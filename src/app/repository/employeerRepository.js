import { instanciaPrisma } from "../database/conexao.js";


export class employeerRepository{
    async showAllEmployeer(){
        try{
            return await instanciaPrisma.employee.findMany({
                orderBy:{
                    id: 'desc'
                }
            })
        }catch(error){
            throw new Error(error)
        }
    }

    async createEmployeer(employeerData){
        const {name, email, cpf, phone, cell_phone, cep, logradouro, numero, complemento, bairro, cidade, rua} = await employeerData
        try {
            const employeer = await instanciaPrisma.employee.create({
                data: {name, email, cpf, phone, cell_phone}
            })
            
            const addressEmployeer = await instanciaPrisma.address.create({
                data: {cep, logradouro, numero, complemento, bairro, cidade, rua}
            })
            console.log(addressEmployeer)
            const employee_id = employeer.id
            const address_id = addressEmployeer.id
            const employeer_address = await instanciaPrisma.employee_address.create({
                data: {employee_id, address_id}
            })

            const message = 'fornecedor cadastrado com sucesso'
            return({
                employeer, adresses: addressEmployeer,
                message
            })
        } catch (error) {
            throw new Error(error)
        }
    }


    async EditEmployeer(cpf, takeAddress){
        console.log(takeAddress)
        const {email, phone, cell_phone, name, cep, logradouro, numero, complemento, bairro, cidade} = takeAddress
        try {
            const findEmployeer = await instanciaPrisma.employee.update({
                where: {
                    cpf
                },
                data:{
                    name: name,
                    email: email,
                    phone: phone,
                    cell_phone: cell_phone
                }
            })
                
            const addressEmployeer = await instanciaPrisma.employee_address.findMany({
                where:{
                    employee_id: findEmployeer.id
                },
                select:{
                    address_id: true
                }
            })
                console.log(addressEmployeer, 'lerolero')
                
            const updateAddressEmployer = await instanciaPrisma.address.update({
                where:{
                    id: addressEmployeer[0].address_id
                },
                data:{
                    cep: cep,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    bairro: bairro,
                    cidade: cidade
                }
            })

            return{
                employer: findEmployeer,
                address: updateAddressEmployer,
            }



        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteEmployeer(cpf){
        try {
            const deleteCpf = await instanciaPrisma.employee.delete({
                where:{
                    cpf
                },
            })
            return(deleteCpf)
        } catch (error) {
            throw new Error(error)
        }

    }
}