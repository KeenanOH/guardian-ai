import { z } from "zod"

import { authenticatedProcedure, router } from "@/server/trpc"

export const journalRouter = router({
    createJournalEntry: authenticatedProcedure
        .input(z.object({
            content: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.journalEntry.create({
                data: {
                    userId: ctx.user.id,
                    content: input.content
                }
            })
        }),
    getJournalEntries: authenticatedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.journalEntry.findMany({
                where: {
                    userId: ctx.user.id
                }
            })
        }),
    getDailyJournalEntryCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            return ctx.prisma.journalEntry.count({
                where: {
                    userId: ctx.user.id,
                    createdAt: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            })
        }),
    getTotalJournalEntryCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.journalEntry.count({
                where: {
                    userId: ctx.user.id
                }
            })
        })
})
