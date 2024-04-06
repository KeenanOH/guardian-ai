import { publicProcedure, router } from "@/server/trpc"

export const testRouter = router({
    testRoute: publicProcedure
        .query(async () => {
            return "Hello, World!"
        })
})
