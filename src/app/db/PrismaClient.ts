import { PrismaClient } from "@prisma/client";
export class InstanciaPrisma {
  static prisma: PrismaClient = new PrismaClient();
  
  static GetConnection(): PrismaClient {
    return this.prisma ? this.prisma : (this.prisma = new PrismaClient());
  }
}
