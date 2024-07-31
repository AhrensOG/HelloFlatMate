import { useRouter } from "next/navigation";
import Chat from "../../chats/Chats";
import HeaderChats from "../../chats/HeaderChats";
import SearchChat from "../../chats/SearchChat";

export default function WorkerChats() {
  const route = useRouter();
  return (
    <main className="m-2 flex flex-col gap-2">
      <HeaderChats />
      <SearchChat />
      <Chat action={() => route.push("/pages/worker-panel/chats/chat")} />;
    </main>
  );
}
