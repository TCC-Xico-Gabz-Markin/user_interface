import { ChatType } from "@/types/ChatType";

export function sortChatListByUpdatedAt(chatList: ChatType[]): ChatType[] {
    return chatList.sort((a: ChatType, b: ChatType) =>
        new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
    )
}