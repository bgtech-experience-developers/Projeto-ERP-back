import { PrismaClient } from "@prisma/client";

export class Prisma{
    private static prisma: PrismaClient = new PrismaClient();

    static async connection(): Promise<PrismaClient> {
        return this.prisma
        ? this.prisma
        : (this.prisma = new PrismaClient());
    }
}