import { chatRouter } from "@/server/routers/chat"
import { testRouter } from "@/server/routers/test"
import { mergeRouters } from "@/server/trpc"

export const appRouter = mergeRouters(
    testRouter,
    chatRouter
)

export type AppRouter = typeof appRouter
