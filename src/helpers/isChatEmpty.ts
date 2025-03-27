import { ChatType } from "@/types/ChatType";

export default function isChatEmpty(chat: ChatType | undefined): boolean {
    return chat === undefined || chat?.messages.length === 0
}