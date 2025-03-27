import sendReply from "@/actions/chat/sendReply";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSendReply(chatID: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => await sendReply(chatID),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chat'] })
    });
}