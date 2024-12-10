import { InstanciaPrisma } from "../db/PrismaClient.js";

class SupplierRepository {
    protected static connectionDb: InstanciaPrisma = InstanciaPrisma.GetConnection();
    // Estudar Promisse.All()
    // static getAll()

}