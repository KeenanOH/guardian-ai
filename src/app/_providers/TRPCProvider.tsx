"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import React, { useState } from "react"
import superjson from "superjson"

import { trpc } from "@/utils/trpc"

function getBaseUrl() {
    if (typeof window !== "undefined")
        return ""

    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}`

    return `http://localhost:${process.env.PORT ?? 3000}`
}

export default function TRPCProvider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    transformer: superjson
                })
            ],
        })
    )

    return (
        <trpc.Provider queryClient={ queryClient } client={ trpcClient }>
            <QueryClientProvider client={ queryClient }>
                { children }
            </QueryClientProvider>
        </trpc.Provider>
    )
}
