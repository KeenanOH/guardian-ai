import React from "react"

export default function ChatMessage({ human, children }: { human: boolean, children: string }) {
    if (human) {
        return (
            <div className="flex justify-end">
                <span className="bg-zinc-200 dark:bg-zinc-100 dark:text-black p-2 rounded-md max-w-[75%]">
                    { children.split("\n").map((text, index) => <p key={ index }>{ text }</p>) }
                </span>
            </div>
        )
    }

    return (
        <div className="flex justify-start">
            <span className="bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white p-2 rounded-md max-w-[75%]">
                { children.split("\n").map((text, index) => <p key={ index }>{ text }</p>) }
            </span>
        </div>
    )
}
