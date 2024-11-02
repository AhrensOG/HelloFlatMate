import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageContainer({ messages, socketId, isUploading }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isUploading]);

    return (
        <section
            ref={containerRef}
            className="flex flex-col gap-2 w-full overflow-y-scroll grow p-4 bg-white rounded-md shadow-inner"
            style={{ maxHeight: `calc(100vh - 181px)` }}
        >
            {messages.length === 0 && !isUploading ? (
                <p className="font-normal text-xs text-[#919191] self-center">No hay mensajes aún</p>
            ) : (
                <>
                    {messages.map((msg, index) => (
                        <Message
                            key={index}
                            type={(msg.senderId || msg.userId) === socketId ? "sender" : "receiver"}
                            body={msg.text || msg.body}
                            image={msg.image}
                            time={msg.time || new Date(msg.date).toLocaleTimeString() || "N/A"}
                            name={msg.userName || "N/A"}
                            typeFile={msg.type}
                            isUploading={msg.isUploading || false}
                            hasFailed={msg.hasFailed || false}
                        />
                    ))}
                    {/* Mostrar previsualización mientras se carga */}
                    {isUploading && <Message type="sender" isUploading={isUploading} />}
                </>
            )}
        </section>
    );
}
