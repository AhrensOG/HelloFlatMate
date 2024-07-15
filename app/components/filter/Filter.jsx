"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FilterSection from "./filter_section/FilterSection";
import RoomCounter from "./filter_section/RoomCounter";
import PriceRange from "./filter_section/PriceRange";
import { plus_jakarta } from "@/font";

export default function Filter({ isOpen, setOpen }) {
  const typeProperty = [
    "HelloRoom",
    "HelloColiving",
    "HelloStudio",
    "HelloLandlord",
  ];

  const comoditis = [
    "Wifi",
    "Cocina",
    "Lavadero",
    "Piscina",
    "Amueblado",
    "Jardin",
  ];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{ duration: 0.8 }}
          className={`${plus_jakarta.className} flex flex-col gap-3 w-full h-full overflow-hidden self-end fixed bg-white bottom-0 z-50 py-4`}
        >
          <div className="h-[5vh] w-full flex items-center px-4">
            <span>
              <Image
                src={"/btn-close.svg"}
                alt="Close button"
                layout="responsive"
                width={24}
                height={24}
                onClick={() => setOpen(false)}
              />
            </span>
            <h2 className="text-center grow text-lg font-bold">Filter</h2>
          </div>
          <div className="overflow-auto space-y-10">
            <section className="flex flex-col gap-3 px-4">
              <h3 className="text-[1.37rem] font-bold text-[#1C1C21]">
                Ubicacion
              </h3>
              <div className="flex justify-between items-center h-[5vh]">
                <p className="text-end font-normal">Direccion 1, avenida</p>
                <span className="h-full">
                  <Image
                    src={"/filter/location-icon.svg"}
                    alt="Location icon"
                    width={28}
                    height={28}
                  />
                </span>
              </div>
            </section>
            <FilterSection title={"Comodidades"} entries={comoditis} />
            <RoomCounter />
            <FilterSection title={"Tipo de Propiedad"} entries={typeProperty} />
            <PriceRange />
          </div>
          <div className="sticky bg-white shadow-md py-2 px-4 flex justify-between">
            <button className="w-[8.12rem] h-[2.5rem] bg-[#0C1660] text-[#FAFAFA] rounded-lg text-sm font-bold">
              Ver Resultados
            </button>
            <button className="w-[8.12rem] h-[2.5rem] bg-[#DCD8D8] text-black rounded-lg text-sm font-bold">
              Limpiar Filtros
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
