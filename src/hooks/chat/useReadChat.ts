import readChatByID from "@/actions/chat/readChat";
import { ChatType } from "@/types/ChatType";
import { useQuery } from "@tanstack/react-query";

export default async function useReadChatByID(initialData: ChatType) {
    return useQuery({
        queryFn: async () => await readChatByID(initialData.id),
        queryKey: ["chat", initialData.id],
        initialData: initialData
    });
}