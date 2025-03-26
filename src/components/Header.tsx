import ThemeToggle from "./theme/ThemeToggle";

export default function Header() {
    return (
        <nav className="h-14 w-full p-2 flex items-center justify-between">
            <h1 className="font-bold text-2xl">Chat Aça<span className="text-details-1">AI</span></h1>
            <ThemeToggle/>
        </nav>
    )
}