"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { trpc } from "@/utils/trpc"

export default function History() {
    
    const { status } = useSession()
    const chats = trpc.getChats.useQuery()

    if (status === "unauthenticated") {
        redirect("/auth/login")
    } else if (status === "loading" || !chats.data) {
        return null
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Chat History</h1>
            </div>
            { chats.data.map(chat =>
                <Link key={ chat.id } href={ `/dashboard/chat/${chat.id}` } className="border p-2 rounded-md">
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        { chat.createdAt.toDateString() } @ { chat.createdAt.toLocaleTimeString() }
                    </p>
                </Link>
            ) }
        </>
    )
}
