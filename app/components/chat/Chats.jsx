import ChatCard from "./ChatCard";

export default function Chat() {
  return (
    <div>
      <ChatCard name={"Propietario"} image={"/chat/chat-1.png"} />
      <ChatCard name={"Mantenimiento"} image={"/chat/chat-3.png"} />
      <ChatCard name={"Habitacion"} image={"/chat/chat-2.jfif"} />
      <ChatCard name={"Soporte"} image={"/chat/soporte.svg"} />
    </div>
  );
}
