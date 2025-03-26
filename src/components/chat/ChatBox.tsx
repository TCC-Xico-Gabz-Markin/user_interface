"use client"

import Message from "./Message";
import getMessages from "@/actions/getMessages";
import { useQuery } from "@tanstack/react-query";


export default function ChatBox() {
    const { data: chat, isLoading } = useQuery({
        queryFn: () => getMessages(),
        queryKey: ["chat"]
    });

    return (
        <div className={`px-4 w-full max-h-full overflow-y-hidden transition-all duration-500 ${chat === undefined || chat?.length === 0 ? 'h-1/2' : 'h-full'}`}>
            {chat === undefined || chat?.length === 0 ? (
                <div className={"w-full h-full flex flex-col justify-end items-center"}>
                    <h1 className="font-bold text-4xl text-center pb-2">Olá, bem vindo ao Chat Aç<span className="text-details-1">AI</span></h1>
                    <h2 className="text-2xl text-center">Otimize queries em MySql e deixe o seu projeto mais eficiente com o nossa ferramenta!</h2>
                </div>
            ) : (
                <div className="w-full h-full max-h-full border rounded-4xl p-3 overflow-y-auto flex flex-col">
                    {/*por algum motivo o first:mt-auto não funciona*/}
                    <div className="mt-auto"></div>

                    {chat?.map((message, index) => (
                        <Message key={index} content={message.content} sentBy={message.sentBy} />
                    ))}
                    {isLoading && <p>Loading...</p>}
                </div>
            )}
        </ div>
    )
}