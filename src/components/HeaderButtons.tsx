"use client"

import { FaPenToSquare } from "react-icons/fa6";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useParams, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
    invertLogic?: boolean
}

export default function HeaderButtons(props: Props) {
    const isMobile = useIsMobile();
    const { invertLogic } = props;
    const { open } = useSidebar();
    const params = useParams();
    const router = useRouter();

    const handleClick = () => {
        if (params.id) {
            router.push("/");
        }
    }

    if (isMobile) {
        return (
            <div className="flex">
                <div className="mr-2">
                    <SidebarTrigger />
                </div>
                <Button size="icon" variant="ghost" onClick={handleClick}>
                    <FaPenToSquare />
                </Button>
            </div>
        )
    }

    if (invertLogic) {
        return (
            open && (
                <div className="flex">
                    <div className="mr-2">
                        <SidebarTrigger />
                    </div>
                    <Button size="icon" variant="ghost" onClick={handleClick}>
                        <FaPenToSquare />
                    </Button>
                </div>
            )
        )
    }

    return (
        !open && (
            <div className="flex" >
                <div className="mr-2">
                    <SidebarTrigger />
                </div>
                <Button size="icon" variant="ghost" onClick={handleClick}>
                    <FaPenToSquare />
                </Button>
            </div>
        )
    )
}