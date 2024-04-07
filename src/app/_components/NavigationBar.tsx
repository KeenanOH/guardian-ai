import Link from "next/link"

import ThemeModeToggle from "@/app/_components/ThemeModeToggle"
import { Button } from "@/components/ui/button"

export default function NavigationBar() {

    return (
        <div className="flex absolute w-[95vw] h-24 px-8 md:px-16 items-center gap-x-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-white">
                GuardianAI
            </h3>
            <div className="ml-auto flex items-center gap-x-8">
                <Link href="/dashboard">
                    <Button>Dashboard</Button>
                </Link>
                <ThemeModeToggle />
            </div>
        </div>
    )

}
