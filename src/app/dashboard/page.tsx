"use client"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { trpc } from "@/utils/trpc"

export default function Dashboard() {

    const { status } = useSession()
    const dailyChats = trpc.getDailyChatCount.useQuery()
    const dailyJournalEntries = trpc.getDailyJournalEntryCount.useQuery()
    const dailyBreathe = trpc.getDailyBreatheCount.useQuery()

    if (status === "unauthenticated") {
        redirect("/auth/login")
    } else if (status === "loading") {
        return null
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card
                    x-chunk="dashboard-05-chunk-0"
                >
                    <CardHeader className="pb-3">
                        <CardTitle>Start Chatting</CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Have a chat with GuardianAI.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-4">
                        <Link href="/dashboard/chat">
                            <Button>Start a Session</Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                        <CardDescription>Chat</CardDescription>
                        <CardTitle className="text-4xl">{ dailyChats.data ?? 0 }/1</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Complete at least one chat session today.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={ dailyChats.data ?? 0 >= 1 ? 100 : 0 } aria-label="completion gague" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                    <CardHeader className="pb-2">
                        <CardDescription>Track</CardDescription>
                        <CardTitle className="text-4xl">{ dailyJournalEntries.data ?? 0 }/1</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Track your mood in your journal today at least once.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={ dailyJournalEntries.data ?? 0 >= 1 ? 100 : 0 } aria-label="completion gague" />
                    </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="pb-2">
                        <CardDescription>Breathe</CardDescription>
                        <CardTitle className="text-4xl">{ dailyBreathe.data ?? 0 }/1</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Complete one breathing session today.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={ dailyBreathe.data ?? 0 >= 1 ? 100 : 0 } aria-label="completion gague" />
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
