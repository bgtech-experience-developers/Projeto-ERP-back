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
        return await this.dbClient.$queryRaw `${queryRaw}`;
    }
    adapterQuery(query) {
        if (query === "postgres") {
            return query.replace(/(LOWER\((.*?))\)/, (match, p1) => `LOWER(${p1})`);
        }
        else if (query === "mysql") {
            return query.replace(/(LOWER\((.*?))\)/, (match, p1) => `LOWER(${p1})`);
        }
        return query;
    }
}
