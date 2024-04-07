"use client"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc } from "@/utils/trpc"

export default function Analytics() {


    const { status } = useSession()
    const dailyChats = trpc.getDailyChatCount.useQuery()
    const dailyJournalEntries = trpc.getDailyJournalEntryCount.useQuery()
    const dailyBreathe = trpc.getDailyBreatheCount.useQuery()
    const totalChats = trpc.getTotalChatCount.useQuery()
    const totalJournalEntries = trpc.getTotalJournalEntryCount.useQuery()
    const totalBreaths = trpc.getTotalBreatheCount.useQuery()

    if (status === "unauthenticated") {
        redirect("/auth/login")
    } else if (status === "loading") {
        return null
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="md:col-span-2" x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-2">
                        <CardDescription>Daily Chats</CardDescription>
                        <CardTitle className="text-4xl">{ dailyChats.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The amount of chat sessions you&apos;ve had today.
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>Daily Entries</CardDescription>
                        <CardTitle className="text-4xl">{ dailyJournalEntries.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The amount of journal entries you&apos;ve written today.
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Daily Breaths</CardDescription>
                        <CardTitle className="text-4xl">{ dailyBreathe.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The amount of breathing sessions you&apos;ve completed today.
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-0">
                    <CardHeader className="pb-2">
                        <CardDescription>Total Chats</CardDescription>
                        <CardTitle className="text-4xl">{ totalChats.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The total amount of chat sessions you&apos;ve had.
                        </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>Total Entries</CardDescription>
                        <CardTitle className="text-4xl">{ totalJournalEntries.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The total amount of journal entries you&apos;ve written.
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2" x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Total Breaths</CardDescription>
                        <CardTitle className="text-4xl">{ totalBreaths.data ?? 0 }</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            The total amount of breathing sessions you&apos;ve completed.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
