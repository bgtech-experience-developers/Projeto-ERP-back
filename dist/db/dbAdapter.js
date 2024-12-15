import { PrismaClient } from "@prisma/client";
export class SQLAdapter {
    dbClient;
    dbType;
    constructor(dbClient) {
        this.dbClient = dbClient;
        this.dbType = this.getDBType();
    }
    getDBType() {
        if (this.dbClient instanceof PrismaClient) {
            return process.env.DB_PROVIDER === "mysql" ? "mysql" : "postgres";
        }
        return "unknown";
    }
    async executeQuery(query) {
        const queryRaw = this.adapterQuery(query);
        console.log("a query é", queryRaw);
        const query1 = "";
        const result = await this.dbClient.$executeRawUnsafe(query1);
        console.log(result);
        return;
    }
    adapterQuery(query) {
        if (query === "postgress") {
            return query.replace(/LIKE\((.*?)\)/, (match, p1) => {
                console.log("ola eu sou o match", match);
                console.log("ola eu sou o p", p1);
                return `ILIKE (${p1})`;
            });
        }
        else if (this.dbType === "mysql") {
            return query.replace(/LIKE\((.*?)\)/g, (match, p1) => {
                console.log("ola eu sou o match", match);
                console.log("ola eu sou o mf", p1);
                return `LIKE ${p1}`;
            });
        }
        return query;
    }
}
