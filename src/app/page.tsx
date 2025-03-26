import ChatBox from "@/components/chat/ChatBox";
import UserForm from "@/components/UserForm";

export default function Home() {
    return (
        <main className="w-full h-[calc(100vh-56px)] flex justify-center">
            <div className="w-full h-full max-w-2xl flex flex-col justify-start">
                <ChatBox />
                <UserForm />
            </div>
        </main>
    );
}
