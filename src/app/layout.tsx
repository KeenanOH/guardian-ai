import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"

import NextAuthProvider from "@/app/_providers/NextAuthProvider"
import { ThemeProvider } from "@/app/_providers/ThemeProvider"
import TRPCProvider from "@/app/_providers/TRPCProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "GuardianAI",
    description: "Your AI mental health companion",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <TRPCProvider>
                    <NextAuthProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <main>
                                { children }
                            </main>
                        </ThemeProvider>
                    </NextAuthProvider>
                </TRPCProvider>
            </body>
        </html>
    )
}
