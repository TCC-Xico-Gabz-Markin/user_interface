"use server"

import { MessageType } from "@/types/MessageType";
import addMessage from "./addMessage";
import sendReply from "./sendReply";

export default async function sendMessage(content: string) {
    const newMessage: MessageType = {
        content: content,
        sentBy: "user"
    };

    await addMessage(newMessage);
}
