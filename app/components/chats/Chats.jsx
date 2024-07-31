import ChatsCard from "./ChatsCard";

export default function Chat({ action }) {
  return (
    <div>
      <ChatsCard
        name={"Propietario"}
        image={"/chat/chat-1.png"}
        action={action}
      />
      <ChatsCard
        name={"Mantenimiento"}
        image={"/chat/chat-3.png"}
        action={action}
      />
      <ChatsCard
        name={"Habitacion"}
        image={"/chat/chat-2.jfif"}
        action={action}
      />
      <ChatsCard name={"Soporte"} image={"/chat/soporte.svg"} action={action} />
    </div>
  );
}
