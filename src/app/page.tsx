"use client";

import readChatByID from "@/actions/chat/readChat";
import ChatBox from "@/components/chat/ChatBox";
import UserForm from "@/components/UserForm";
import { generateRandomString } from "@/helpers/generateRandomString";
import isChatEmpty from "@/helpers/isChatEmpty";
import userSentMessage from "@/helpers/userSentMessage";
import useSendReply from "@/hooks/chat/useSendReply";
import { ChatType } from "@/types/ChatType";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const [chatID] = useState<string>(generateRandomString());
    const newChat: ChatType = {
        id: chatID,
        messages: []
    };

    const { data: chat } = useQuery({
        queryFn: async () => await readChatByID(chatID),
        queryKey: ["chat", chatID],
        initialData: newChat
    });

    const { mutateAsync, isPending } = useSendReply(chatID);

    const sendReply = async () => {
        await mutateAsync();
    };

    useEffect(() => {
        if (userSentMessage(chat)) {
            sendReply();
            router.push(`/${chat.id}`);
        }
    }, [chat]);

    return (
        <main className="w-full h-[calc(100vh-56px)] flex justify-center">
            <div className="w-full h-full max-w-2xl flex flex-col justify-start">
                <div className={`px-4 w-full max-h-full overflow-y-hidden transition-all duration-500 ${isChatEmpty(chat) ? 'h-1/2' : 'h-full'}`}>
                    {isChatEmpty(chat) ? (
                        <div className={"w-full h-full flex flex-col justify-end items-center"}>
                            <h1 className="font-bold text-4xl text-center pb-2">Olá, bem vindo ao Chat Aç<span className="text-details-1">AI</span></h1>
                            <h2 className="text-2xl text-center">Otimize queries em MySql e deixe o seu projeto mais eficiente com a nossa ferramenta!</h2>
                        </div>
                    ) : (
                        <ChatBox chat={chat} isPending={isPending} />
                    )}
                </div>
                <UserForm chat={chat} createNewChatOnSubmit={true} />
            </div>
        </main>
    );
}
