import FornecedorRepository from "../repository/fornecedorRepository.js";

const {buscarUnico, buscarTodos, editarFornecedor, criar, deletar} = new FornecedorRepository

class FornecedorController {

    async buscarTodos(req, res){
        try {
            const fornecedor = await buscarTodos();
            return res.json(fornecedor);

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Erro interno no servidor!'})
        }
    }

    async buscarUnico(req, res){
        try {
            const cpf = req.params.cpf;
            const fornecedor = await buscarUnico(cpf);
            return res.status(201).json(fornecedor);

        } catch (error) {
            if (error.message === 'Fornecedor não encontrado ou inexistente!') {
                return res.status(404).json({message: error.message})
            }

            res.status(500).json({message: 'Erro interno no servidor!'})
        }
    }

    async criar(req, res){
        try {
            const {name, rg, date_of_birthday, type, cpf, email, situation, phone, cell_phone, cep, logradouro, numero, complemento, bairro, cidade} = req.body
            const {cadastrar_fornecedor, message} = await criar(
                name,
                rg,
                date_of_birthday,
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
                cidade
            );

            return res.status(201).json(message);
        } catch (error) {
            console.log(error);

            if (error.code === 'P2002') {
                return res.status(409).json({message: 'Fornecedor já cadastrado no sistema!'})
            }

            res.status(500).json({message: 'Erro interno do servidor!'})
        }
    }

    async deletar(req, res){
        try {
            const {cpf} = req.params;
            console.log(cpf);

            const fornecedorDeletado = await deletar(cpf);
            return res.status(200).json(fornecedorDeletado.message);
            
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(409).json({message: 'Fornecedor deletado com sucesso!'})
            }

            res.status(500).json({message: 'Erro interno no servidor!'})
        }
    }

    async editarFornecedor(req, res){
        try {
            const pegarId = Number(req.params.id)
            const dataFornecedor = req.body
            const AtualizarFornecedor = await editarFornecedor(pegarId, dataFornecedor)
            res.status(200).json({AtualizarFornecedor, message: 'Fornecedor atualizado'})
            
        } catch (error) {
            if (error.code == 'p2002'){
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }
            console.log(error)
            res.status(500).json({ message: "Erro interno de servidor!" });
        }
    }
}

export default FornecedorController;