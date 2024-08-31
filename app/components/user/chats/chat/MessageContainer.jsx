import Message from "./Message";

export default function MessageContainer({ messages }) {
  return (
    <section className="flex flex-col gap-2 w-full h-[78vh] my-4 overflow-auto grow">
      <p className="font-normal text-xs text-[#919191] self-center ">
        Lunes 1 de julio 2024 a las 09:12
      </p>
      {messages.map((msg, index) => (
        <Message
          key={index}
          type={msg.type} // Asume que "sender" es cuando roomId es 1
          body={msg.text}
          time={new Date().toLocaleTimeString()} // Puedes ajustar esto según tus necesidades
        />
      ))}
    </section>
  );
}
