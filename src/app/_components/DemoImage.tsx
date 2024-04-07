"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function DemoImage() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (theme === "dark") {
        return <Image
            src="/example_chat_dark.png"
            alt="example chat dark"
            width="1920"
            height="1080"
            className="md:ml-auto object-scale-down w-2/4"
        />
    } else {
        return <Image
            src="/example_chat_light.png"
            alt="example chat dark"
            width="1920"
            height="1080"
            className="md:ml-auto object-scale-down w-2/4"
        />
    }
}
