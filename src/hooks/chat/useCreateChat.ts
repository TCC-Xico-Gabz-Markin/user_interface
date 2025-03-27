import createChat from "@/actions/chat/createChat";
import { ChatType } from "@/types/ChatType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateChat(chat: ChatType) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await createChat(chat),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chat'] })
    });
}