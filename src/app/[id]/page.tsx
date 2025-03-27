"use client";

import ChatBox from "@/components/chat/ChatBox";
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";


export default function ChatPage() {
    const params = useParams();
    const id = params.id;

    if (typeof (id) === "string") {
        return (
            <main className="w-full h-[calc(100vh-56px)] flex justify-center">
                <div className="w-full h-full max-w-2xl flex flex-col justify-start">
                    <ChatBox chatID={id} />
                    <UserForm chatID={id} />
                </div>
            </main>
        );
    }
}
