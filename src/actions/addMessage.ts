import { MessageType } from "@/types/MessageType";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "messages.json");

export default async function addMessage(newMessage: MessageType) {
    try {
        let messages: MessageType[] = [];

        try {
            const data = await readFile(filePath, "utf-8");
            messages = JSON.parse(data);
        } catch (error) {
            messages = [];
        }

        messages.push(newMessage);
        await writeFile(filePath, JSON.stringify(messages, null, 2));
    } catch (error) {
        console.error("Error writing message to file:", error);
    }
}