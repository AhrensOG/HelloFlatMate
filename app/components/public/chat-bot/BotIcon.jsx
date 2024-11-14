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
    <div className="fixed bottom-10 right-10 flex items-center justify-center z-50">
      <button
        onClick={handleOpen}
        // className="h-16 w-16 rounded-full flex items-center justify-center bg-[#ADD8E6]/70"
        className="h-16 w-16 rounded-lg flex items-center justify-center bg-blue-500 relative"
      >
        {/* <Image src="/chat_bot/bot.png" width={50} height={50} alt="bot" /> */}
        <Image src="/chat_bot/bot2.png" width={40} height={40} alt="bot" />
      </button>
      <AnimatePresence>
        {/* Condicional para renderizar BotModal solo cuando isOpen es true */}
        {isOpen && <BotModal onClose={handleOpen} />}
      </AnimatePresence>
    </div>
  );
}
