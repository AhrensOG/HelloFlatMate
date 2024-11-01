import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageContainer({ messages, socketId, isUploading }) {
    const containerRef = useRef(null);

    // Efecto para desplazar el contenedor de mensajes hacia abajo cuando se añaden nuevos mensajes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <section
            ref={containerRef}
            className="flex flex-col gap-2 w-full overflow-y-scroll grow p-4 bg-white rounded-md shadow-inner"
            style={{ maxHeight: `calc(100vh - 181px)` }}
        >
            {messages.length === 0 ? (
                <p className="font-normal text-xs text-[#919191] self-center">No hay mensajes aún</p>
            ) : (
                messages.map((msg, index) => {
                    let imageUrl = null;

                    // Verificar si el archivo es un ArrayBuffer y convertirlo en Blob
                    if (msg.image instanceof ArrayBuffer) {
                        const blob = new Blob([msg.image], { type: "image/jpeg" }); // Cambia "image/jpeg" al tipo MIME adecuado si es necesario
                        imageUrl = URL.createObjectURL(blob);
                    }

                    return (
                        <Message
                            key={index}
                            type={(msg.senderId || msg.userId) === socketId ? "sender" : "receiver"}
                            body={msg.text || msg.body}
                            image={imageUrl} // Usamos el URL si es un ArrayBuffer convertido a Blob
                            time={msg.time || new Date(msg.date).toLocaleTimeString() || "N/A"}
                            name={msg.userName || "N/A"}
                            typeFile={msg.type}
                            isUploading={isUploading}
                        />
                    );
                })
            )}
        </section>
    );
}
