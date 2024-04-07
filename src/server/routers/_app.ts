import { breatheRouter } from "@/server/routers/breathe"
import { chatRouter } from "@/server/routers/chat"
import { journalRouter } from "@/server/routers/journal"
import { testRouter } from "@/server/routers/test"
import { mergeRouters } from "@/server/trpc"

export const appRouter = mergeRouters(
    testRouter,
    chatRouter,
    journalRouter,
    breatheRouter
)

export type AppRouter = typeof appRouter
