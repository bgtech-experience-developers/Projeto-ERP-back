export class ApiPhy {
  // static connection: PrismaClient = InstanciaPrisma.GetConnection();
  static async emailToPython(email) {}
  static async getExcelPython(api_key, url) {
    try {
      const data = await fetch(url, {
        headers: { Authorization: api_key },
        method: "GET",
      });

      //   const dataSanitize = await this.sanitizeDataPython(response);
      const response = await data.json();
      console.log(response);

      return "deu certo";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async sanitizeDataPython(data) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
ApiPhy.getExcelPython(
  "token $2b$10$RDlnK2JbMHNyw3tUnSye7.fGBlHbBtD552xWdr2BQ1MWpR3mfhHiy",
  "http://127.0.0.1:5000/dados"
);
