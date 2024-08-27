import Image from "next/image";
import NavServices from "./NavServices";
import DescriptionSection from "./DescriptionSection";
import WhatIncludes from "./WhatIncludes";
import ButtonServices from "./ButtonServices";
import { plus_jakarta } from "@/font";
import ModalService from "./modal/ModalService";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestService({ title }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <AnimatePresence>
      <header>
        <div className="relative h-[13.7rem] w-full">
          <Image
            src={"/services/clean-stock-1.jfif"}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            alt="Imagen-stock"
          />
        </div>
        <NavServices />
      </header>
      <main
        className={`${plus_jakarta.className} relative flex flex-col gap-4 m-4 text-[#0D171C]`}
      >
        <h1 className="font-bold text-2xl text-[#0D171C]">
          Servicio de limpieza
        </h1>
        <DescriptionSection
          title={"Descripcion"}
          body={
            "Mantén tu espacio impecable con nuestro servicio de limpieza profesional, diseñado para adaptarse a todas tus necesidades."
          }
        />
        <WhatIncludes
          title={"¿Qué incluye?"}
          items={[
            " Limpieza profunda de todas las áreas: habitaciones, baños, cocina y áreas comunes.",
            "Desinfección de superficies de alto contacto para asegurar un entorno seguro.",
            "Aspirado y limpieza de pisos, alfombras y muebles.",
            "Limpieza de ventanas y eliminación de polvo en lugares difíciles de alcanzar.",
          ]}
        />
        <ButtonServices title={"Solicitar Servicio"} action={handleShowModal} />
      </main>
      {showModal && <ModalService type={"CLEAN"} action={handleShowModal} />}
    </AnimatePresence>
  );
}
