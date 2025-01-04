export class ApiPhy {
    // static connection: PrismaClient = InstanciaPrisma.GetConnection();
    static async emailToPython(email) { }
    static async getExcelPython(api_key, url) {
        try {
            const data = await fetch(url, {
                headers: { Authorization: api_key },
                method: "GET",
            });
            const response = await data.json();
            const dataSanitize = await this.sanitizeDataPython(response);
            return "deu certo";
        }
        catch (error) {
            throw error;
        }
    }
    static async sanitizeDataPython(data) {
        try {
        }
        catch (error) {
            throw error;
        }
    }
}
