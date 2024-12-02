import { motion } from "framer-motion";
import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";

export default function FoutSectionCard({ star, text, name, location }) {
    return (
        <motion.article
            initial={{ opacity: 0, x: -100 }} // Comienza fuera de la vista
            animate={{ opacity: 1, x: 0 }} // Se anima a la posición original
            exit={{ opacity: 0, x: 100 }} // Sale de la vista hacia la derecha
            transition={{ type: "spring", duration: 0.5 }} // Duración de la animación
            className="flex flex-col gap-2 w-full max-w-[47vw] bg-[#F7F7F7] rounded-2xl p-4 text-center text-gray-600"
        >
            <div className="flex gap-2 justify-center">
                {[...Array(star)].map((_, index) => (
                    <StarIcon key={index} className="w-10 h-10 text-orange-500" />
                ))}
            </div>
            <p>{text}</p>
            <p>{name}</p>
            <p className="flex gap-1 self-center">
                <span className="text-black self-center">
                    <MapPinIcon className="w-4 h-4 mb-1" />
                </span>{" "}
                {location}
            </p>
        </motion.article>
    );
}
