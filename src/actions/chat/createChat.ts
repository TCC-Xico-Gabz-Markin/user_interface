"use server"

import { ChatType } from "@/types/ChatType";
import { readFile, writeFile } from "fs/promises";
import path from "path";


const filePath = path.join(process.cwd(), "messages.json");

export default async function createChat(chat: ChatType) {
    let chatList: ChatType[] = [];
    const now = new Date(Date.now());

    chat = {
        ...chat,
        createdAt: now,
        updatedAt: now
    }

    try {
        try {
            const data = await readFile(filePath, "utf-8");
            chatList = JSON.parse(data);
        } catch (error) {
            chatList = [];
        }

        chatList.push(chat);
        await writeFile(filePath, JSON.stringify(chatList, null, 2));

        return chat;
    } catch (error) {
        console.error("Error while creating new chat:", error);
        return chat;
    }
}