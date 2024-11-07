import Image from "next/image";
import NavServices from "./NavServices";
import DescriptionSection from "./DescriptionSection";
import WhatIncludes from "./WhatIncludes";
import ButtonServices from "./ButtonServices";
import { plus_jakarta } from "@/font";
import ModalService from "./modal/ModalService";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";

export default function RequestService({ type, id }) {
  const [showModal, setShowModal] = useState(false);
  const { state } = useContext(Context);
  const [user, setUser] = useState(state?.user);

  useEffect(() => {
    setUser(state?.user);
  }, [state?.user]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <header>
        <div className="relative h-[13.7rem] w-full">
          <Image
            src={type === "CLEAN" ? "/services/clean-stock-2.jpg" : "/services/repair-stock-2.jpg"}
            fill
            className="object-cover object-center"
            alt="Imagen-stock"
          />
        </div>
        <NavServices />
      </header>
      <main
        className={`${plus_jakarta.className} relative flex flex-col gap-4 m-4 text-[#0D171C]`}
      >
        <h1 className="font-bold text-2xl text-[#0D171C]">
          {type === "CLEAN"
            ? "Servicio de limpieza"
            : "Servicio de mantenimiento"}
        </h1>
        <DescriptionSection
          title={"Descripcion"}
          body={
            type === "CLEAN"
              ? "Mantén tu espacio impecable con nuestro servicio de limpieza profesional, diseñado para adaptarse a todas tus necesidades."
              : "Indícanos el problema e iremos a resolverlo."
          }
        />
        <WhatIncludes
          title={"¿Qué incluye?"}
          items={
            type === "CLEAN"
              ? [
                  "Limpieza profunda de todas las áreas: habitaciones, baños, cocina y áreas comunes.",
                  "Desinfección de superficies de alto contacto para asegurar un entorno seguro.",
                  "Aspirado y limpieza de pisos, alfombras y muebles.",
                  "Limpieza de ventanas y eliminación de polvo en lugares difíciles de alcanzar.",
                ]
              : [
                  "Atención personalziada.",
                  "Trabajadores altamente capacitados.",
                  "Reparaciones de todo tipo.",
                ]
          }
        />
        <ButtonServices title={"Solicitar Servicio"} action={handleShowModal} />
      </main>
      {showModal && (
        <ModalService
          type={type}
          action={handleShowModal}
          propertyId={id}
          user={user}
        />
      )}
    </AnimatePresence>
  );
}
