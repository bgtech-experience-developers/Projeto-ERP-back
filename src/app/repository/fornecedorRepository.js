import { instanciaPrisma } from "../database/conexao.js";

class FornecedorRepository {

    async criar(
        name, 
        rg, 
        date_birth,
        type, 
        cpf, 
        email, 
        situation, 
        phone, 
        cell_phone, 
        cep, 
        logradouro, 
        numero,
        complemento, 
        bairro, 
        cidade) {
     try {
        const date_of_birthday = new Date(`${date_birth}T00:00:00Z`)
        // console.log(date_birth);
        
        

        const cadastrar_fornecedor = await instanciaPrisma.supplier.create({data: {name, rg, date_of_birthday: date_of_birthday, type, cpf, email, situation, phone, cell_phone}})
        const supllier_id = cadastrar_fornecedor.id
        
        const address = await instanciaPrisma.address.create({data: {cep, logradouro, numero, complemento, bairro, cidade}})
        const address_id = address.id
        
        const supplier_adress = await instanciaPrisma.supllier_address.create({data: {supllier_id, address_id}});

        console.log(supplier_adress);
        
        const message = {message: "Fornecedor cadastrado com sucesso!"};
        return {cadastrar_fornecedor, message}

     } catch (error) {
        console.log(error);
        throw error;
     }   
    }

    async deletar(cpf) {
        try {
            const fornecedor_id = await instanciaPrisma.supplier.findUnique(
            {where: {cpf: cpf},
            select: {id: true}}
        )
        const result = await instanciaPrisma.supplier.deleteMany(
            {
                where: {id: fornecedor_id.id}
            });

            console.log(result);
            return {message: "Fornecedor deletado com sucesso!"};
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async buscarUnico(cpf) {
        try {
            const fornecedor = await instanciaPrisma.supplier.findUnique({where: {cpf}});

            if (fornecedor === null) {
                throw new Error("Fornecedor não encontrado ou inexistente!");
            }
            return fornecedor;

        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    async buscarTodos() {
        try {
            return await instanciaPrisma.supplier.findMany({
                orderBy: {
                    id: 'desc'
                },
                include: {
                    supplier_address:{
                        include:{
                            address_relation: true,
                            address_id: false,
                            supllier_id: false
                        }
                    }
                }

            });
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }

    async editarFornecedor(id, dataFornecedor){
        try {
            const {name, rg, date_of_birthday, cpf, type, email, situation, phone, cell_phone, 
                cep, logradouro, numero, complemento, bairro, cidade} = dataFornecedor
                const date_birthday = new Date(`${date_of_birthday}T02:00:00Z`);
                
            const fornecedorAtualizado = await instanciaPrisma.supplier.update({
            where:{
                id
            },
            data:{
                name,
                rg,
                date_of_birthday: date_birthday,
                cpf,
                type,
                email,
                situation,
                phone,
                cell_phone,
            }
        })
        console.log(fornecedorAtualizado)
        const addressFornecedor = await instanciaPrisma.supllier_address.findMany({
            where:{
                supllier_id: fornecedorAtualizado.id
            },
            select:{
                address_id: true
            },
        })

        const [numeroFinal] = addressFornecedor
        const atualizarEnderecoFornecedor = await instanciaPrisma.address.update({
            where:{
                id: numeroFinal.address_id
            },
            data:{
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade
            }
        })

        return(
            {
                fornecedor: fornecedorAtualizado,
                address: atualizarEnderecoFornecedor
            }
        )

        } catch (error) {
            throw error
        }
        
    }
}

export default FornecedorRepository;