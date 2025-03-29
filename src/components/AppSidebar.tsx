"use client"

import { useQuery } from "@tanstack/react-query";
import HeaderButtons from "./HeaderButtons";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenuButton } from "./ui/sidebar";
import { readChatList } from "@/actions/chat/readChat";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function AppSideBar() {
    const { data: chatList, isLoading } = useQuery({
        queryFn: async () => await readChatList(),
        queryKey: ["chatList"]
    });

    useEffect(() => {
        console.log("chatList", chatList);
        console.log("chatList.length", chatList?.length);
    }, [chatList]);

    return (
        <Sidebar>
            <SidebarHeader className="flex items-end justify-center">
                <HeaderButtons invertLogic />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {isLoading ? (
                        <div className="w-full h-fit p-3 flex justify-center items-center">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>
                    ) : (
                        chatList === undefined || chatList.length === 0 ? (
                            <div className="w-full h-fit p-3 flex justify-center items-center">
                                <p>no chatlist</p>
                            </div>
                        ) : (
                            chatList.map(chat => (
                                <a href={`/${chat.id}`} key={chat.id}>
                                    <SidebarMenuButton>
                                        <p className="truncate" >{chat?.messages[0]?.content}</p>
                                    </SidebarMenuButton>
                                </a>
                            ))
                        )
                    )}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}