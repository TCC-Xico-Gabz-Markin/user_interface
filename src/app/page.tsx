"use client";

import { useEffect } from "react";
import ChatBox from "@/components/chat/ChatBox";
import UserForm from "@/components/UserForm";
import useCreateChat from "@/hooks/chat/useCreateChat";
import { generateRandomString } from "@/helpers/generateRandomString";

export default function Home() {
    const { data: chat, mutate } = useCreateChat({
        id: generateRandomString(),
        messages: []
    });

    useEffect(() => { mutate() }, []);

    if (chat) {
        return (
            <main className="w-full h-[calc(100vh-56px)] flex justify-center">
                <div className="w-full h-full max-w-2xl flex flex-col justify-start">
                    <ChatBox chatID={chat.id} />
                    <UserForm chatID={chat.id} redirectToChatPageOnSubmit={true} />
                </div>
            </main>
        );
    }
}
