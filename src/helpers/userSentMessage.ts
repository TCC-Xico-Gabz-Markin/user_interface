import { ChatType } from "@/types/ChatType";

export default function userSentMessage(chat: ChatType | undefined): boolean{
    return chat !== undefined && chat.messages.length !== 0 && chat.messages[chat.messages.length - 1].sentBy === "user"
}