import { testRouter } from "@/server/routers/test"
import { mergeRouters } from "@/server/trpc"

export const appRouter = mergeRouters(
    testRouter
)

export type AppRouter = typeof appRouter
