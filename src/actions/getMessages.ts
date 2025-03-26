"use server"

import { MessageType } from "@/types/MessageType";
import fs from 'fs';

export default async function getMessages(): Promise<MessageType[]> {
    const file = fs.readFileSync('./messages.json', 'utf-8');
    const data: MessageType[] = JSON.parse(file);

    return data
}