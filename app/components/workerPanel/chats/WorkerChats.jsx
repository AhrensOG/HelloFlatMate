import { useRouter } from "next/navigation";
import Chat from "../../user/chats/Chats";
import HeaderChats from "../../user/chats/HeaderChats";
import SearchChat from "../../user/chats/SearchChat";

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
