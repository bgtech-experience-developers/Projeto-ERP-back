import { PrismaClient } from "@prisma/client";

export class SQLAdapter {
  dbClient: PrismaClient;
  protected dbType: string;
  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
    this.dbType = this.getDBType();
  }
  getDBType() {
    if (this.dbClient instanceof PrismaClient) {
      return process.env.DB_PROVIDER === "mysql" ? "mysql" : "postgres";
    }
    return "unknown";
  }
  async executeQuery(query: string) {
    const queryRaw = this.adapterQuery(query);
    return await this.dbClient.$queryRaw`${queryRaw}`;
  }
  adapterQuery(query: string) {
    if (query === "postgres") {
      return query.replace(/(LOWER\((.*?))\)/, (match, p1) => `LOWER(${p1})`);
    } else if (query === "mysql") {
      return query.replace(/(LOWER\((.*?))\)/, (match, p1) => `LOWER(${p1})`);
    }
    return query;
  }
}
