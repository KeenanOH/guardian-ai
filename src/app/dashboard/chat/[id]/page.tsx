"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

import ChatComponent from "@/app/_components/chat/ChatComponent"
import { Message } from "@/app/_types/Message"
import { trpc } from "@/utils/trpc"

export default function Chat({ params }: { params: { id: string } }) {

    const { status } = useSession()
    const chat = trpc.chat.useMutation()
    const chatHistory = trpc.getChatHistory.useMutation()
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(()=>{
        chatHistory.mutateAsync({ id: params.id })
            .then(data => setMessages(data))
    }, [])

    if (status === "unauthenticated") {
        redirect("/auth/login")
    } else if (status === "loading") {
        return null
    }

    return (
        <ChatComponent
            onSend={ async (input) => {
                setMessages(messages => messages.concat({ human: true, content: input }))
                const response = await chat.mutateAsync({ id: params.id, message: input })
                setMessages(messages => messages.concat({ human: false, content: response }))
            } }
            messages={ messages }
        />
    )
}
