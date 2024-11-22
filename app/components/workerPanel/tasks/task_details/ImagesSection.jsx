import ImageModal from "@/app/components/user/chats/chat/ImageModal";
import Image from "next/image";
import { useState } from "react";

export default function ImagesSection({ images }) {
    const [isOpen, setIsOpen] = useState(false); // Controlar si el modal está abierto
    const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada

    const handleImageClick = (image) => {
        setSelectedImage(image); // Establece la imagen seleccionada
        setIsOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsOpen(false); // Cierra el modal
        setSelectedImage(null); // Limpia la imagen seleccionada
    };

    return (
        <article className="flex flex-col gap-2 mx-2 w-full m-4">
            <h3 className="font-semibold text-base text-black text-center">Imágenes</h3>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 w-full justify-center">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        onClick={() => handleImageClick(image)} // Maneja el clic para abrir el modal
                        src={image}
                        width={300}
                        height={300}
                        alt={`Imagen ${index + 1}`}
                        className="rounded-lg cursor-pointer"
                    />
                ))}
            </div>

            {/* Modal de la imagen */}
            {isOpen && selectedImage && <ImageModal imageSrc={selectedImage} isOpen={isOpen} onClose={closeModal} />}
        </article>
    );
}
