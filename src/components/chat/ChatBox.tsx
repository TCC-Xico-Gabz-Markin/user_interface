"use client"

import Message from "./Message";
import getMessages from "@/actions/getMessages";
import sendReply from "@/actions/sendReply";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";


export default function ChatBox() {
    const queryClient = useQueryClient();
    const chatRef = useRef<HTMLDivElement | null>(null); // Definindo o tipo corretamente

    const { data: chat, isLoading } = useQuery({
        queryFn: () => getMessages(),
        queryKey: ["chat"],
    });

    const { mutateAsync } = useMutation({
        mutationFn: () => sendReply(),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chat'] })
    });

    const updateChat = async () => {
        await mutateAsync();
    };

    useEffect(() => {
        if (chat !== undefined && chat.length !== 0 && chat[chat.length - 1].sentBy === "user") {
            updateChat();
        }
    }, [chat]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chat]);

    return (
        <div className={`px-4 w-full max-h-full overflow-y-hidden transition-all duration-500 ${chat === undefined || chat?.length === 0 ? 'h-1/2' : 'h-full'}`}>
            {chat === undefined || chat?.length === 0 ? (
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
                    {chat?.map((message, index) => (
                        <Message key={index} message={message} isLoading={isLoading} />
                    ))}
                    {isLoading && (<p className="bg-red-500">Loading...</p>)}
                </div>
            )}
        </div>
    );
}
