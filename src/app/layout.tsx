import "./globals.css"

import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import React from "react"

import NextAuthProvider from "@/app/_providers/NextAuthProvider"
import { ThemeProvider } from "@/app/_providers/ThemeProvider"
import TRPCProvider from "@/app/_providers/TRPCProvider"

const inter = Inter({ subsets: ["latin"] })


const APP_NAME = "GuardianAI"
const APP_DEFAULT_TITLE = "GuardianAI"
const APP_TITLE_TEMPLATE = "GuardianAI"
const APP_DESCRIPTION = "Your AI mental health companion"

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
}

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
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
