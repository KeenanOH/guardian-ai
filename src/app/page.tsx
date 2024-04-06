import Image from "next/image"
import Link from "next/link"

import NavigationBar from "@/app/_components/NavigationBar"
import { Button } from "@/components/ui/button"

export default function Home() {


    return (
        <div className="relative">
            <NavigationBar />
            <div className="min-h-screen grid grid-rows-3 grid-cols-1 place-items-center">
                <Image
                    src="/reach_out_picture.png"
                    alt="hand reaching out"
                    width="1920"
                    height="1080"
                    className="h-screen object-cover row-start-1 col-start-1 row-end-5"
                    priority={ true }
                />
                <h1 className="scroll-m-20 text-4xl font-extrabold text-white tracking-tight lg:text-5xl max-w-[800px] text-center row-start-1 col-start-1 row-end-4">
                    Empowering Lives, Saving Futures: We are here for you.
                </h1>
                <Image
                    src="/down-icon.svg"
                    alt="bouncing arrow"
                    width="52"
                    height="52"
                    className="row-start-4 col-start-1 animate-bounce mb-8"
                />
            </div>
            <div className="flex min-h-screen items-center justify-center mx-16 2xl:mx-64 flex-col md:flex-row gap-y-16 pt-8">
                <div className="max-w-96 text-center md:text-left">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        An AI Tool for Suicide Awareness and Prevention
                    </h2>
                    <p className="leading-7">
                        GuardianAI is designed to assist in suicide awareness and prevention by providing valuable insights and support.
                    </p>
                    <Button className="mt-8">
                        Get Started
                    </Button>
                </div>
                <Image
                    src="/rectangle_placeholder.png"
                    alt="rectangle placeholder"
                    width="509"
                    height="433"
                    className="md:ml-auto"
                />
            </div>
            <footer className="flex gap-x-[50%] justify-center py-8">
                <p>GuardianAI by Keenan</p>
                <Link href="https://github.com/KeenanOH/GuardianAI">
                    GitHub
                </Link>
            </footer>
        </div>
    )
}
