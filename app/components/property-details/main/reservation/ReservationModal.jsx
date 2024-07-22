"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { plus_jakarta } from "@/font";
import SelectContract from "./SelectContract";
import ReservationButton from "../ReservationButton";
import { XMarkIcon } from "@heroicons/react/20/solid";

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
          <div className="w-[44%]">
            <button className=" w-8 h-8" onClick={callback}>
              <XMarkIcon />
            </button>
          </div>
          <div className="self-start w-[50%] pr-3 h-3">
            <button onClick={callback}>
              <Image
                src={"/property_details/reservation/close-line-btn.svg"}
                width={36}
                height={5}
                alt="Boton para cerrar"
              />
            </button>
          </div>
        </div>
        <h2 className="font-medium text-[1.75rem]">Estadía</h2>
        <div className="flex flex-col gap-5 m">
          {/* Contenido del modal */}
          <SelectContract />
          <div className=" self-center w-[90%]">
            <ReservationButton callback={handleRedirect} />
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
