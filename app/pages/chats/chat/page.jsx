import MessageContainer from "@/app/components/chats/chat/MessageContainer";
import MessageInput from "@/app/components/chats/chat/MessageInput";
import NavBar from "@/app/components/nav_bar/NavBar";

export default function ChatPage() {
  return (
    <div>
      <header className="px-2">
        <NavBar />
      </header>
      <main className="flex flex-col justify-center items-center m-2">
        <MessageContainer />
        <MessageInput />
      </main>
    </div>
  );
}
