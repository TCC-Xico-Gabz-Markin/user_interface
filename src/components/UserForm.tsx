"use client"

import { IoIosSend } from "react-icons/io";
import { Button } from "./ui/button";
import UserInput from "./chat/UserInput";
import sendMessage from "@/actions/sendMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";


export default function UserForm() {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat'] })
        },
    })


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            userInput: HTMLInputElement
        }
        await mutateAsync(formElements.userInput.value);
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
