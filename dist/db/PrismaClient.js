import { PrismaClient } from "@prisma/client";
export class InstanciaPrisma {
    static prisma = new PrismaClient({ log: ["query"] });
    static GetConnection() {
        return this.prisma
            ? this.prisma
            : (this.prisma = new PrismaClient({ log: ["query"] }));
    }
}
