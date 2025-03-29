"use server"

import { ChatType } from "@/types/ChatType";
import { readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "messages.json");

export default async function readChatByID(id: string): Promise<ChatType> {
    const emptyChat = {
        id: id,
        messages: []
    }

    try {
        let chatList: ChatType[] = [];

        try {
            const data = await readFile(filePath, "utf-8");
            chatList = JSON.parse(data);
        } catch (error) {
            chatList = [];
        }

        const chat = chatList.find(chat => chat.id === id) ?? emptyChat;

        return chat;
    } catch (error) {
        console.error(`Error while reading chat with id ${id}:`, error);
        return emptyChat
    }
}

export async function readChatList(): Promise<ChatType[]> {
    try {
        let chatList: ChatType[] = [];

        try {
            const data = await readFile(filePath, "utf-8");
            chatList = JSON.parse(data);
        } catch (error) {
            chatList = [];
        }

        return chatList;
    } catch (error) {
        console.error(`Error while reading chat list`, error);
        return []
    }
}