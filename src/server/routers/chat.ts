import { FirestoreChatMessageHistory } from "@langchain/community/stores/message/firestore"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { TRPCError } from "@trpc/server"
import { ConversationChain } from "langchain/chains"
import { BufferMemory } from "langchain/memory"
import { z } from "zod"

import { authenticatedProcedure, router } from "@/server/trpc"
import { firestoreConfig } from "@/utils/langchain/firestoreConfig"

export const chatRouter = router({
    getChats: authenticatedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.chat.findMany({
                where: {
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    createdAt: true
                }
            })
        }),
    getDailyChatCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            return ctx.prisma.chat.count({
                where: {
                    userId: ctx.user.id,
                    createdAt: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            })
        }),
    getTotalChatCount: authenticatedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.chat.count({
                where: {
                    userId: ctx.user.id
                }
            })
        }),
    createChat: authenticatedProcedure
        .mutation(async ({ ctx }) => {
            return ctx.prisma.chat.create({
                data: {
                    userId: ctx.user.id
                },
                select: {
                    id: true
                }
            })
        }),
    getChatHistory: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const memory = new BufferMemory({
                chatHistory: new FirestoreChatMessageHistory({
                    collections: ["chats"],
                    sessionId: input.id,
                    userId: ctx.user.id,
                    config: firestoreConfig,
                }),
                memoryKey: "history"
            })
            const messages = await memory.chatHistory.getMessages()

            return messages.map(message => {
                const messageType = message._getType()

                if (messageType === "human") {
                    return { human: true, content: message.content.toString() }
                } else {
                    return { human: false, content: message.content.toString() }
                }
            })
        }),
    chat: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            message: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const chat = await ctx.prisma.chat.findFirst({
                where: {
                    id: input.id,
                    userId: ctx.user.id
                }
            })

            if (!chat) throw new TRPCError({ code: "BAD_REQUEST" })

            const memory = new BufferMemory({
                chatHistory: new FirestoreChatMessageHistory({
                    collections: ["chats"],
                    sessionId: input.id,
                    userId: ctx.user.id,
                    config: firestoreConfig,
                }),
                memoryKey: "history"
            })

            const prompt = ChatPromptTemplate.fromTemplate(
                `You are a mental health specialist.

                Here is how you should respond:
                * Use layman's terms
                * Do not overwhelm the client
                * Respond kindly, showing compassion

                Consider the following chat history when you are responding:
                <<<
                {history}
                >>>

                Message: {input}
                Response:
                `
            )

            const outputParser = new StringOutputParser()
            const chain = new ConversationChain({
                memory, prompt, llm: ctx.mistralModel, outputParser
            })
            const response = await chain.invoke({ input: input.message })
            return response.response
        })
})
