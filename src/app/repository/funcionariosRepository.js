import { instanciaPrisma } from "../database/conexao.js";

class FuncionariosRepository {
    async criar (nome, email, cpf, telefone, celular) {
        try {
            const funcionario = await instanciaPrisma.fucionarios.findUnique({where: {cpf}});
            if (!funcionario) {
                const cadastrarFuncionario = await instanciaPrisma.fucionarios.create({data: {nome, email, cpf, celular, telefone}})
                const message = {message: "Funcionário cadastrado com sucesso!"}
                return {
                    cadastrarFuncionario,
                    message
                };
            } else {
                throw new Error("Dados inválidos")
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async buscarTodos() {
        try {
            return await instanciaPrisma.fucionarios.findMany()
        } catch (error) {
            throw new Error(error)
        }
    }

    async atualizarFuncionario(nome, email, cpf, celular, telefone) {
        const funcionario = await instanciaPrisma.fucionarios.findUnique({where: {cpf}});
        
        try {
            if (funcionario) {
                const funcionarioNovo = await instanciaPrisma.fucionarios.update({where: {cpf}, data: {nome, email, cpf, celular, telefone}})
                return {
                    funcionarioAntigo: funcionario,
                    funcionarioNovo
                }
            } else {
                throw new Error('Usuário inexistente')
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deletar(cpf) {
        try {
            const funcionario = await instanciaPrisma.fucionarios.findUnique({where: {cpf}});
            if (!funcionario) {
                throw new Error('Não é possível deletar um funcionário inexistente')
            }
            await instanciaPrisma.fucionarios.delete({where: {cpf}});
            const message = {message: 'Funcionário deletado com sucesso!'}
            return message

        } catch (error) {
            throw new Error(error)
        }
    }
}

export default FuncionariosRepository