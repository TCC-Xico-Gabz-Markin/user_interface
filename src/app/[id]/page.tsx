"use client";

import readChatByID from "@/actions/chat/readChat";
import ChatBox from "@/components/chat/ChatBox";
import UserForm from "@/components/UserForm";
import userSentMessage from "@/helpers/userSentMessage";
import useSendReply from "@/hooks/chat/useSendReply";
import { ChatType } from "@/types/ChatType";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function ChatPage() {
    const params = useParams();
    const id = params.id as string;

    const emptyChat: ChatType = {
        id: id,
        messages: []
    }

    const { data: chat, isLoading } = useQuery({
        queryFn: async () => await readChatByID(id),
        queryKey: ["chat", emptyChat.id],
        initialData: emptyChat
    });

    const { mutateAsync, isPending } = useSendReply(id);

    const sendReply = async () => {
        await mutateAsync();
    };

    useEffect(() => {
        if (userSentMessage(chat)) {
            sendReply();
        }
    }, [chat]);

    return (
        <main className="w-full h-[calc(100vh-56px)] flex justify-center">
            <div className="w-full h-full max-w-3xl flex flex-col justify-start">
                {isLoading ? (
                    <div className="w-full h-full p-3">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                ) : (
                    <ChatBox chat={chat} isPending={isPending} />
                )}
                <UserForm chat={chat} />
            </div>
        </main>
    );
    
}
