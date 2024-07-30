import ChatsCard from "./ChatsCard";

export default function Chat() {
  return (
    <div>
      <ChatsCard name={"Propietario"} image={"/chat/chat-1.png"} />
      <ChatsCard name={"Mantenimiento"} image={"/chat/chat-3.png"} />
      <ChatsCard name={"Habitacion"} image={"/chat/chat-2.jfif"} />
      <ChatsCard name={"Soporte"} image={"/chat/soporte.svg"} />
    </div>
  );
}
