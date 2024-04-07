import { authenticatedProcedure, router } from "@/server/trpc"

export const breatheRouter = router({
    createBreathe: authenticatedProcedure
        .mutation(async ({ ctx }) => {
            return ctx.prisma.breathe.create({
                data: {
                    userId: ctx.user.id
                }
            })
        }),
    getDailyBreatheCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            return ctx.prisma.breathe.count({
                where: {
                    userId: ctx.user.id,
                    createdAt: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            })
        }),
    getTotalBreatheCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.breathe.count({
                where: {
                    userId: ctx.user.id
                }
            })
        }),
})
