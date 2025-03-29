import updateChat from "@/actions/chat/updateChat";
import { ChatType } from "@/types/ChatType";
import { MessageType } from "@/types/MessageType";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useUpdateChat(chatID: string, message: MessageType) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await updateChat(chatID, message),
        onSuccess: () => {
            return queryClient.invalidateQueries({ queryKey: ['chat', chatID] })
        },
    })
}