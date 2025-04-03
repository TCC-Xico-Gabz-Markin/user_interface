"use server"

import { MessageType, SentByEnum } from "@/types/MessageType";
import { generateRandomString } from "@/helpers/generateRandomString";
import updateChat from "./updateChat";
import readChatByID from "./readChat";


const BASE_URL = process.env.DBSTRUCTUREAPI_HOST || "http://127.0.0.1:8002/"
const API_KEY = process.env.DBSTRUCTUREAPI_API_KEY as string
const DB_ID = "67bf98cc596db49beda4af2a"

export default async function sendReply(chaID: string) {
    try {
        let content: string = ""

        const newID = generateRandomString();
        const chat = await readChatByID(chaID);

        const userMessage = chat.messages[chat.messages.length - 1].content
        
        const response = await fetch(`${BASE_URL}db_structure/${DB_ID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X_API_KEY": API_KEY
            },
            body: JSON.stringify({
                "db_id": DB_ID,
                "db_name": "teste",
                "order": userMessage
            })
        })

        if (!response.ok) {
            content = "Parece que aconteceu algum erro!"
        } else {
            const data = await response.json();
            content = data.response;
        }

        let reply: MessageType = {
            id: newID,
            content: content,
            sentBy: SentByEnum.BOT
        }

        updateChat(chaID, reply);

        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        console.log(`Error while sending a Reply to chat`, error);
    }
}