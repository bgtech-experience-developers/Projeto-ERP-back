import FornecedoresRepository from "../repository/fornecedoresRepository.js"

const {criar, mostrar, deletar} = new FornecedoresRepository;

class FornecedoresController {
    async criar(req, res) {
        try {
            const {nome, email, telefone, celular, situacao, tipo} = req.body
            const fornecedor = await criar(nome, email, telefone, celular, situacao, tipo);
            console.log("Chegou aqui");
            res.json(fornecedor)

        } catch (error) {
            res.json('Não foi possível cadastrar o fornecedor')
        }
    }

    async mostrar(req, res) {
        try {
            const fornecedor = await mostrar()
            res.json(fornecedor)

        } catch (error) {
            res.json('Fornecedores não encontrados' + error)
        }
    }

    async deletar(req, res) {
        try {
            const {nome, email} = req.body
            const fornecedorDeletado = await deletar(nome, email)
            res.json(fornecedorDeletado.message)

        } catch (error) {
            res.status(505).send('Não foi possível deletar o Fornecedor ' + error.message)
        }
    }
}

export default FornecedoresController;