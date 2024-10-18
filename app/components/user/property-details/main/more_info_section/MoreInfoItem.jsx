import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import MoreInfoModal from "./MoreInfoModal";
import { AnimatePresence } from "framer-motion";

export default function MoreInfoItem({ title, body, isOpen, action }) {
  return (
    <article>
      <div className="flex justify-between items-center p-2 text-[#0D171C] bg-[#F7FAFA]">
        <h3 className="font-normal text-lg">{title}</h3>
        <button
          onClick={action} // Llama a la función que maneja la apertura
          className="h-10 w-10 text-[#0E155F] p-2 bg-[#E8EDF2] rounded-lg"
          type="button"
        >
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>
      <AnimatePresence>
        {/* Solo muestra el modal si este item está abierto */}
        {isOpen && <MoreInfoModal body={body} action={action} />}
      </AnimatePresence>
    </article>
  );
}
