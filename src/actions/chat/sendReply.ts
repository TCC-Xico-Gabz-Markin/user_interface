"use server"

import { MessageType, SentByEnum } from "@/types/MessageType";
import { generateRandomString } from "@/helpers/generateRandomString";
import updateChat from "./updateChat";


export default async function sendReply(chaID: string) {
    try {
        const newID = generateRandomString();

        let reply: MessageType = {
            id: newID,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam commodi, rem veniam amet, corrupti, excepturi iusto rerum doloribus numquam pariatur repudiandae illo ullam sapiente reiciendis voluptatem aspernatur beatae iure? Tempora!",
            sentBy: SentByEnum.BOT
        }

        updateChat(chaID, reply);

        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        console.log(`Error while sending a Reply to chat`, error);
    }
}