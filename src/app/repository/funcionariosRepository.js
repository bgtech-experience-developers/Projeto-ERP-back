import { instanciaPrisma } from "../database/conexao.js";

class FuncionariosRepository {
    async criar (nome, email, cpf, telefone, celular,) {
        try {
            const funcionario = await instanciaPrisma.fucionarios.findUnique({where: {cpf}});
            if (!funcionario) {
                const cadastrarFuncionario = await instanciaPrisma.fucionarios.create({data: {nome, cpf, celular, telefone, email}})
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

    async atualizar() {
        return 'ORM return'
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