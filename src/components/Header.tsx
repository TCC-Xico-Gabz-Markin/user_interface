import { FaPenToSquare } from "react-icons/fa6";
import ThemeToggle from "./theme/ThemeToggle";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <nav className="h-14 w-full flex items-center justify-between">
            <div className="flex w-fit h-fit p-2 justify-center">
                <Button size="icon" variant="ghost">
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