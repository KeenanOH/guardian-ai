import { User } from "@prisma/client"
import { getServerSession } from "next-auth"

import { prisma } from "@/server/prisma"
import { appRouter } from "@/server/routers/_app"
import { createCallerFactory } from "@/server/trpc"
import { mistralModel } from "@/utils/langchain/mistralModel"
import { nextAuthOptions } from "@/utils/nextAuth"

export const createCaller = createCallerFactory(appRouter)

export async function getUser() {
    const session = await getServerSession(nextAuthOptions)

    return session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })
}


export async function getCaller(user: User) {
    const context = { user, prisma, mistralModel }
    return createCaller(context)
}
