import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ImageModal({ imageSrc, isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
                className="relative bg-white rounded-lg overflow-hidden p-4"
                onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en la imagen
            >
                <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">
                    <XMarkIcon className="h-8 w-8 text-black hover:text-red-500" />
                </button>
                <Image src={imageSrc} alt="Imagen del mensaje" width={1000} height={1000} className="rounded-lg" />
            </div>
        </div>
    );
}
