import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

import { Context } from "@/server/context"

const t = initTRPC.context<Context>().create({
    transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(async (opts) => {
    const { user } = opts.ctx

    if (!user)
        throw new TRPCError({ code: "UNAUTHORIZED" })

    return opts.next({
        ctx: {
            user
        }
    })
})

export const createCallerFactory = t.createCallerFactory
export const mergeRouters = t.mergeRouters
