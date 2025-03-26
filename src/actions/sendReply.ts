"use server"

import { MessageType } from "@/types/MessageType";
import addMessage from "./addMessage";

export default async function sendReply() {
    let reply: MessageType = {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam commodi, rem veniam amet, corrupti, excepturi iusto rerum doloribus numquam pariatur repudiandae illo ullam sapiente reiciendis voluptatem aspernatur beatae iure? Tempora!",
        sentBy: "bot"
    }

    await addMessage(reply);
    await new Promise(resolve => setTimeout(resolve, 3000));
}