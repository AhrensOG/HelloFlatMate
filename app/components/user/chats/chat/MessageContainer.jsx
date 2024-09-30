import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageContainer({ messages, socketId }) {
  const containerRef = useRef(null);
  console.log(messages);

  // Efecto para desplazar el contenedor de mensajes hacia abajo cuando se añaden nuevos mensajes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={containerRef}
      className="flex flex-col gap-2 w-full my-4 overflow-y-scroll grow p-2 bg-white rounded-md shadow-inner max-h-[78vh]"
    >
      {messages.length === 0 ? (
        <p className="font-normal text-xs text-[#919191] self-center">
          No hay mensajes aún
        </p>
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            type={
              (msg.senderId || msg.userId) === socketId ? "sender" : "receiver"
            } // Comparar senderId con el socketId del cliente
            body={msg.text || msg.body} // Asumiendo que el mensaje tiene un campo 'text'
            time={msg.time || new Date(msg.date).toLocaleTimeString() || "N/A"} // Mostrar la hora si está disponible
          />
        ))
      )}
    </section>
  );
}
