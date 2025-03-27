"use client"

import { FaPenToSquare } from "react-icons/fa6";
import ThemeToggle from "./theme/ThemeToggle";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";

export default function Header() {
    const params = useParams();
    const router = useRouter();

    const handleClick = () => {
        console.log(params);

        if (params.id){
            router.push("/");
        }
    }

    return (
        <nav className="h-14 w-full flex items-center justify-between">
            <div className="flex w-fit h-fit p-2 justify-center">
                <Button size="icon" variant="ghost" onClick={handleClick}>
                    <FaPenToSquare />
                </Button>
                <h1 className="font-bold text-2xl ml-2">Chat Aça<span className="text-details-1">AI</span></h1>
            </div>
            <div className="p-2">
                <ThemeToggle />
            </div>
        </nav>
    )
}