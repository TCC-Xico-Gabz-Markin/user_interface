import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <nav className="h-14 w-full p-2 flex flex-row-reverse items-center">
            <ThemeToggle/>
        </nav>
    )
}