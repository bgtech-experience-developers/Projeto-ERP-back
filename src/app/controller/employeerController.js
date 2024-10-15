import { instanciaPrisma } from "../database/conexao.js";
import { employeerRepository } from "../repository/employeerRepository.js";

const {showAllEmployeer, createEmployeer} = new employeerRepository 
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

}