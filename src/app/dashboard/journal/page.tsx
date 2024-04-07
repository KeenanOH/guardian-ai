"use client"

import { Check } from "lucide-react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trpc } from "@/utils/trpc"

export default function Journal() {

    const journalEntries = trpc.getJournalEntries.useQuery()
    const createJournalEntry = trpc.createJournalEntry.useMutation()
    const [input, setInput] = useState("")
    const { status } = useSession()

    if (status === "unauthenticated") {
        redirect("/auth/login")
    } else if (status === "loading") {
        return null
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Journal</h1>
            </div>

            <div>
                <form
                    className="flex gap-x-4"
                    onSubmit={ e => {
                        e.preventDefault()

                        createJournalEntry.mutateAsync({ content: input })
                            .then(result => {
                                if (journalEntries.data)
                                    journalEntries.data.push(result)

                                setInput("")

                            })
                    } }
                >
                    <Input value={ input } placeholder="Today, I feel ______." onChange={ e => setInput(e.target.value) } />
                    <Button type="submit" size="icon">
                        <Check className="w-4 h-4" />
                    </Button>
                </form>
                <hr className="mt-8" />
                <div className="flex flex-col gap-y-4 mt-8">
                    { (journalEntries.data ?? []).map(entry =>
                        <div key={ entry.id }>
                            <p className="font-bold">
                                { entry.createdAt.toDateString() } @ { entry.createdAt.toLocaleTimeString() }
                            </p>

                            <div className="p-2 rounded-md border">{ entry.content }</div>
                        </div>
                    ) }
                </div>
            </div>
        </>
    )

}
