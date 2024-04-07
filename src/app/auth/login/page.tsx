"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function Login() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Login with GitHub to access to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Button variant="outline" className="w-full" onClick={ () => signIn("github", { callbackUrl: "/dashboard" }) }>
                            Login with GitHub
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/reach_out_picture.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-screen object-cover"
                />
            </div>
        </div>
    )
}
