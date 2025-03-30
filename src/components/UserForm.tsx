"use client"

import { IoIosSend } from "react-icons/io";
import { Button } from "./ui/button";
import UserInput from "./chat/UserInput";
import React, { useState } from "react";
import { generateRandomString } from "@/helpers/generateRandomString";
import useUpdateChat from "@/hooks/chat/useUpdateChat";
import { MessageType } from "@/types/MessageType";
import { ChatType } from "@/types/ChatType";
import useCreateChat from "@/hooks/chat/useCreateChat";


type Props = {
    chat: ChatType,
    createNewChatOnSubmit?: boolean,
}

export default function UserForm(props: Props) {
    const { chat, createNewChatOnSubmit } = props;
    const [message, setMessage] = useState<MessageType>({
        id: generateRandomString(),
        content: "",
        sentBy: "user"
    });

    const { mutateAsync: updateChat } = useUpdateChat(chat.id, message)
    const { mutateAsync: createChat } = useCreateChat(chat)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            userInput: HTMLInputElement
        }

        setMessage({ ...message, content: formElements.userInput.value });

        if (createNewChatOnSubmit) await createChat();

        await updateChat();
    }

    return (
        <div className="w-full p-4 flex justify-center h-fit">
            <form
                className="flex flex-col items-end px-4 py-3 max-w-3xl w-full h-fit rounded-4xl bg-primary/10"
                onSubmit={handleSubmit}
            >
                <UserInput
                    id="userInput"
                    name="userInput"
                    placeholder="Pergunte alguma coisa..."
                />
                <Button size="icon" type="submit" ><IoIosSend /></Button>
            </form>
        </div>
    );
}
