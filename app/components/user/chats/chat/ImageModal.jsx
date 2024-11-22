import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ImageModal({ imageSrc, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300">
            <div
                className="relative bg-black rounded-lg overflow-hidden shadow-lg max-w-[90%] max-h-[90%] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en la imagen
            >
                {/* Botón de cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-black bg-opacity-60 hover:bg-opacity-90 text-white p-2 rounded-full transition duration-300"
                >
                    <XMarkIcon className="h-6 w-6 text-white hover:text-red-500" />
                </button>

                {/* Imagen */}
                <Image
                    src={imageSrc}
                    alt="Imagen del mensaje"
                    width={1000}
                    height={1000}
                    className="rounded-lg object-contain"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
            </div>
        </div>
    );
}
