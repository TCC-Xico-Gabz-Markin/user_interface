"use client"

import readChatByID from "@/actions/chat/readChat";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import userSentMessage from "@/helpers/userSentMessage";
import isChatEmpty from "@/helpers/isChatEmpty";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useSendReply from "@/hooks/chat/useSendReply";

type Props = {
    chatID: string
}

export default function ChatBox(props: Props) {
    const chatRef = useRef<HTMLDivElement | null>(null);
    const { chatID } = props;

    const { data: chat } = useQuery({
        queryFn: async () => await readChatByID(chatID),
        queryKey: ["chat"],
    });

    const { mutateAsync, isPending } = useSendReply(chatID);

    const sendReply = async () => {
        await mutateAsync();
    };

    useEffect(() => {
        if (userSentMessage(chat)) {
            sendReply();
        }
    }, [chat]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div className={`px-4 w-full max-h-full overflow-y-hidden transition-all duration-500 ${isChatEmpty(chat) ? 'h-1/2' : 'h-full'}`}>
            {isChatEmpty(chat) ? (
                <div className={"w-full h-full flex flex-col justify-end items-center"}>
                    <h1 className="font-bold text-4xl text-center pb-2">Olá, bem vindo ao Chat Aç<span className="text-details-1">AI</span></h1>
                    <h2 className="text-2xl text-center">Otimize queries em MySql e deixe o seu projeto mais eficiente com a nossa ferramenta!</h2>
                </div>
            ) : (
                <div
                    ref={chatRef}
                    className="w-full h-full max-h-full border rounded-4xl p-3 overflow-y-auto flex flex-col"
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
            )}
        </div>
    );
}
