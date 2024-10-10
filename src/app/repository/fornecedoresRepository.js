import { instanciaPrisma } from "../database/conexao.js";

class FornecedoresRepository {
    async criar(nome, email, telefone, celular, situacao, tipo){
        try {
            const fornecedores = await instanciaPrisma.fornecedores.findUnique({where: {email}})
            console.log('Chegou aqui');
            
            if (!fornecedores) {
                const cadastrarFornecedor = await instanciaPrisma.fornecedores.create({data: {nome, email, telefone, celular, situacao, tipo}})
                const message = {message: 'R: Fornecedor cadastrado com sucesso!'}
                return {
                    cadastrarFornecedor,
                    message
                }
            } else {
                throw new Error('R: Dados em uso!')
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async mostrar() {
        try {
            return await instanciaPrisma.fornecedores.findMany()
        } catch (error) {
            throw new Error(error)
        }
    }

    async deletar(nome, email) {
        try {
            const fornecedor = await instanciaPrisma.fornecedores.findUnique({where: {nome, AND: {email}}})
            if (!fornecedor) {
                throw new Error('R: Fornecedor inexistente');
            }
    
            await instanciaPrisma.fornecedores.delete({where:{nome, AND: {email}}})
            const message = {message: 'Fornecedor deletado com sucesso!'}
            return message

        } catch (error) {
            throw new Error(error)
        }

    }
}

export default FornecedoresRepository;