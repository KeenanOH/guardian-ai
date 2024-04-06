import { PrismaClient } from "@prisma/client"

function prismaClientSingleton() {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton> // eslint-disable-line
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production")
    globalThis.prisma = prisma
