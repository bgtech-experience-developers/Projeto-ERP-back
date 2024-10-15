import { instanciaPrisma } from "../database/conexao.js";

class FornecedorRepository {

    async criar(nome, rg, data_nascimento, tipo, cpf, email, situacao, telefone, celular, cep, logradouro, numero, complemento, bairro, cidade) {
     try {
        const data_aniversario = new Date(`${data_nascimento} T00:00:00Z`)

        const cadastrar_fornecedor = await instanciaPrisma.supplier.create({data: {nome, rg, data_nascimento, type, cpf, email, situacao, telefone, celular}})
        const fornecedor_id = cadastrar_fornecedor.id

        const address = await instanciaPrisma.create({data: {cep, logradouro, numero, complemento, bairro, cidade}})
        const address_id = address.id

        console.log(fornecedor_id);
        console.log(address_id);
        
        const fornecedor_adress = await instanciaPrisma.supllier_address.create({data: {fornecedor_id, address_id}});

        console.log(fornecedor_adress);
        
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
            return await instanciaPrisma.supplier.findMany();
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }
}

export default FornecedorRepository;