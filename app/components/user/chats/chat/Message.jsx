import Image from "next/image";
import { useEffect } from "react";

export default function Message({ type, body, image, time, name, typeChat, typeFile, isUploading }) {
    const sender = "border border-[#D6D6DE] rounded-sender self-end";
    const receiver = "bg-[#1C8CD6] rounded-receiver text-white self-start";

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    return (
        <article
            className={`${
                type === "sender" ? sender : receiver
            } flex flex-col justify-between items-center gap-1 p-3 min-w-[5rem] max-w-[15rem] break-words relative`}
            style={{
                boxShadow: `-1px -1px 5px 0px #0000000D, 1px 1px 5px 0px #0000000D`,
            }}
        >
            {/* Spinner Overlay */}
            {isUploading && image && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            )}
            {/* Mostrar el nombre si el tipo es "group" */}
            {typeChat === "group" && <p className="w-full text-start font-bold text-xs text-resolution-blue">{name}</p>}

            {/* Mostrar imagen o texto según el contenido del mensaje */}
            {image || typeFile === "IMAGE" ? (
                typeFile === "IMAGE" ? (
                    <Image src={body} alt="Imagen enviada" className="w-full rounded-lg" width={200} height={200} />
                ) : (
                    <img src={image} alt="Imagen enviada" className="w-full rounded-lg" />
                )
            ) : (
                <p className={`${type === "sender" ? "text-black" : ""} w-full text-wrap font-medium text-sm`}>{body}</p>
            )}

            <p className={`${type === "sender" ? "text-[#919191]" : ""} w-full text-end font-normal text-xs`}>{time}</p>
        </article>
    );
}
