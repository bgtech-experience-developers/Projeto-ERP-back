import { instanciaPrisma } from "../database/conexao.js";
import { employeerRepository } from "../repository/employeerRepository.js";

const {showAllEmployeer, createEmployeer, EditEmployeer, deleteEmployeer} = new employeerRepository 
export class employeeController{

    async showAllEmployeer(req, res){
        try{
            const employeer = await showAllEmployeer()
            res.json(employeer)
        }catch(error){
            throw new Error(error)
        }
    }

    async createEmployeer(req, res){
        try {
            const employeerData = req.body
            const employeerCreated = await createEmployeer(employeerData)
            res.status(200).json(employeerCreated)
        } catch (error) {
            throw new Error(error)
        }
    }

    async uniqueEmployeer(req, res){
        try {
            const {cpf} = req.params
            const takeAddress = req.body
            const showData = await EditEmployeer(cpf, takeAddress)
            res.status(200).send(showData) 
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteEmployeer(req, res){
        try {
            const {cpf} = req.params
            const clearData = await deleteEmployeer(cpf)
            res.status(200).json({clearData, message: 'contratante excluido'})
        } catch (error) {
            throw new Error(error);
        }
    }
}