"use client"

import { IoIosSend } from "react-icons/io";
import { Button } from "./ui/button";
import UserInput from "./chat/UserInput";
import React, { useState } from "react";
import { generateRandomString } from "@/helpers/generateRandomString";
import useUpdateChat from "@/hooks/chat/useUpdateChat";
import { MessageType } from "@/types/MessageType";

type Props = {
    chatID: string
}

export default function UserForm(props: Props) {
    const { chatID } = props;
    const [message, setMessage] = useState<MessageType | undefined>(undefined);

    const { mutateAsync } = useUpdateChat(chatID, message as MessageType)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            userInput: HTMLInputElement
        }

        setMessage({
            id: generateRandomString(),
            content: formElements.userInput.value,
            sentBy: "user"
        });
        
        await mutateAsync();
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
