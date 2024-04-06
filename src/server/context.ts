import { getServerSession } from "next-auth"

import { prisma } from "@/server/prisma"
import { nextAuthOptions } from "@/utils/nextAuth"

export async function createContext() {
    const session = await getServerSession(nextAuthOptions)

    const user = session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    return { user, prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>
