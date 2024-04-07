"use client"
import React, { useState } from "react"

import ChatComponent from "@/app/_components/chat/ChatComponent"
import { Message } from "@/app/_types/Message"
import { trpc } from "@/utils/trpc"

export default function Chat() {

    const createChat = trpc.createChat.useMutation()
    const chat = trpc.chat.useMutation()

    const [chatId, setChatId] = useState<string>()
    const [messages, setMessages] = useState<Message[]>([])

    return (
        <ChatComponent
            onSend={ async (input) => {
                setMessages(messages => messages.concat({ human: true, content: input }))

                if (chatId) {
                    const response = await chat.mutateAsync({ id: chatId, message: input })
                    setMessages(messages => messages.concat({ human: false, content: response }))
                    return
                }

                const newChat = await createChat.mutateAsync(undefined)
                setChatId(newChat.id)
                const response = await chat.mutateAsync({ id: newChat.id, message: input })
                setMessages(messages => messages.concat({ human: false, content: response }))

            } }
            messages={ messages }
        />
    )
}
