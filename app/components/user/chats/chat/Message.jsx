import Image from "next/image";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

export default function Message({ type, body, image, time, name, typeChat, typeFile, isUploading, hasFailed }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sender = "border border-[#440cac] rounded-sender self-end";
    const receiver = "bg-[#440cac] rounded-receiver text-white self-start";

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <article
                className={`${
                    type === "sender" ? sender : receiver
                } flex flex-col justify-between items-center gap-2 p-3 min-w-[5rem] max-w-[15rem] break-words relative ${
                    isUploading ? "min-h-[9rem] w-[15rem]" : ""
                } shadow-sm hover:shadow-md duration-300` }
            >
                {/* Spinner Overlay */}
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Mostrar mensaje de error si la carga falla */}
                {hasFailed && (
                    <span className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50 text-white font-bold text-xs">
                        Fallo al enviar
                    </span>
                )}

                {/* Mostrar el nombre si el tipo es "group" */}
                {typeChat === "group" && <p className={`w-full text-start font-bold text-base ${type === "sender" ? "text-[#440cac]" : "text-white"}`}>{name}</p>}

                {/* Mostrar imagen o texto según el contenido del mensaje */}
                {image || typeFile === "IMAGE" ? (
                    <div onClick={handleImageClick} className="cursor-pointer">
                        <Image
                            src={typeFile === "IMAGE" ? body : image}
                            alt="Imagen enviada"
                            className="w-full rounded-lg"
                            width={200}
                            height={200}
                        />
                    </div>
                ) : (
                    <p className={`${type === "sender" ? "text-black" : ""} w-full text-wrap text-sm`}>{body}</p>
                )}

                <p className={`${type === "sender" ? "text-[#440cac]" : ""} w-full text-end text-xs`}>{time}</p>
            </article>

            {/* Modal de la imagen */}
            <ImageModal imageSrc={typeFile === "IMAGE" ? body : image} isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}
