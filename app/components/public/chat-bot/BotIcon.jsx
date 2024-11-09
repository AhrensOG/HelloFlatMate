import Image from "next/image";
import { useState } from "react";
import BotModal from "./BotModal";
import { AnimatePresence } from "framer-motion";

export default function BotIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen((prev) => !prev); // Alternar entre abrir y cerrar el modal
    };

    return (
        <div className="fixed bottom-10 right-10 flex items-center justify-center">
            <button
                onClick={handleOpen}
                className="h-16 w-16 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(173, 216, 230, 0.7)",
                }}
            >
                <Image src="/chat_bot/bot.png" width={50} height={50} alt="bot" />
            </button>
            <AnimatePresence>
                {/* Condicional para renderizar BotModal solo cuando isOpen es true */}
                {isOpen && <BotModal />}
            </AnimatePresence>
        </div>
    );
}
