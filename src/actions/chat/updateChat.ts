"use server"

import { ChatType } from "@/types/ChatType";
import { MessageType } from "@/types/MessageType";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "messages.json");

export default async function updateChat(chatID: string, message: MessageType) {
    try {
        let chatList: ChatType[] = [];

        try {
            const data = await readFile(filePath, "utf-8");
            chatList = JSON.parse(data);
        } catch (error) {
            chatList = [];
        }

        const chat = chatList.find(chat => chat.id === chatID);
        chat?.messages.push(message);
        
        await writeFile(filePath, JSON.stringify(chatList, null, 2));
    } catch (error) {
        console.log(`Error while updating chat with message ${message.id}`, error);
    }
}