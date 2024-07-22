"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { plus_jakarta } from "@/font";
import SelectContract from "./SelectContract";
import ReservationButton from "../ReservationButton";

export default function ReservationModal({ callback }) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/pages/payment");
  };

  return (
    <AnimatePresence>
      <motion.aside
        className={`${plus_jakarta.className} flex flex-col gap-5 px-4 py-2 fixed bottom-0 inset-x-0 min-h-[30vh] bg-[#FCFCFC] shadow-lg rounded-t-[1.55rem] `}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex">
          <button className="self-start py-3 pl-3 w-[44%]" onClick={callback}>
            <Image
              src={"/property_details/reservation/close-x-btn.svg"}
              width={16}
              height={16}
              alt="Boton para cerrar"
            />
          </button>
          <button className="self-start pt-2 pr-3 w-[50%]" onClick={callback}>
            <Image
              src={"/property_details/reservation/close-line-btn.svg"}
              width={36}
              height={5}
              alt="Boton para cerrar"
            />
          </button>
        </div>
        <h2 className="font-medium text-[1.75rem]">Estadía</h2>
        <div className="flex flex-col gap-5 m">
          {/* Contenido del modal */}
          <SelectContract />
          <ReservationButton callback={handleRedirect} />
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
