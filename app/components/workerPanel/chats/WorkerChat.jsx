import MessageContainer from "../../user/chats/chat/MessageContainer";
import MessageInput from "../../user/chats/chat/MessageInput";

export default function WorkerChat() {
  return (
    <main className="flex flex-col justify-center items-center m-3 h-[86vh]">
      <MessageContainer />
      <MessageInput />
    </main>
  );
}
