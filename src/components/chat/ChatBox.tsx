"use client"

import Message from "./Message";
import { useEffect, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ChatType } from "@/types/ChatType";

type Props = {
    chat: ChatType
    isPending?: boolean
}

export default function ChatBox(props: Props) {
    const chatRef = useRef<HTMLDivElement | null>(null);
    const { chat, isPending } = props;

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div
            ref={chatRef}
            className="w-[calc(100%-32px)] max-h-full h-full border rounded-4xl p-4 mx-4 overflow-y-auto flex flex-col"
        >
            <div className="mt-auto"></div>
            {chat?.messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            {isPending && (
                <div className="w-full h-fit p-3">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            )}
        </div>
    );
}
