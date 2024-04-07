import { redirect } from "next/navigation"
import React from "react"

import { getCaller, getUser } from "@/server/caller"

export default async function Breathe() {

    const user = await getUser()

    if (!user) {
        return redirect("/auth/login")
    }

    const caller = await getCaller(user)
    await caller.createBreathe()

    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-lg font-semibold md:text-2xl">Breathe</h1>
                <p>Breathe for any length of time.</p>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="animate-breathe border-8 border-black dark:border-white w-64 h-64 md:w-96 md:h-96 rounded-full"/>
            </div>
        </>
    )
}
