import { Send } from "lucide-react"
import React, { useRef, useState } from "react"

import ChatMessage from "@/app/_components/chat/ChatMessage"
import { Message } from "@/app/_types/Message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatComponent({ onSend, messages }: { onSend: (input: string) => Promise<void>, messages: Message[] }) {

    const [input, setInput] = useState("")
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Chat</h1>
            </div>

            <div className="flex flex-col justify-end h-full gap-y-8">
                <div className="flex flex-col m-8 gap-y-4">
                    { messages.map((message, index) =>
                        <ChatMessage key={ index } human={ message.human }>
                            { message.content }
                        </ChatMessage>
                    ) }
                    <div ref={ messagesEndRef } />
                </div>

                <form
                    className="flex gap-x-8 mt-8 sticky bottom-0 p-8 bg-white dark:bg-inherit"
                    onSubmit={ e => {
                        e.preventDefault()
                        setInput("")
                        onSend(input)
                            .then(() => {
                                scrollToBottom()
                            })
                    } }
                >
                    <Input placeholder="What would you like to chat about?" value={ input } onChange={ e => setInput(e.target.value) } />
                    <Button type="submit" size="icon">
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </>
    )
}
