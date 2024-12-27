"use client";

import Image from "next/image";
import React, { useState, useContext, useMemo } from "react";
import RequestForm from "./auxiliarComponents/RequestForm";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";

const RequestSection = ({
  title = "¿No encuentras lo que buscas?",
  description = "¡No te preocupes! Estamos aquí para ayudarte a encontrar el alojamiento perfecto para ti. Cuéntanos tus necesidades y lo haremos realidad.",
  requestForm = false,
  filters = {},
}) => {
  const { state } = useContext(Context);
  const router = useRouter();

  // Inicializar el estado del modal basado en el usuario y requestForm
  const [isModalOpen, setIsModalOpen] = useState(state.user && requestForm);

  // Usar useMemo para calcular filtros válidos solo cuando cambien
  const validFilters = useMemo(() => {
    const filtered = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value != null)
    );
    return {
      ...filtered,
      requestForm: "true",
      scrollToForm: "true",
    };
  }, [filters]);

  const handleRedirect = () => {
    const currentUrl = `${window.location.pathname}`;
    const filterParams = new URLSearchParams(validFilters).toString();
    const redirectUrl = `${currentUrl}?${filterParams}`;
    router.push(`/pages/auth?redirect=${encodeURIComponent(redirectUrl)}`);
  };

  const toggleModal = () => {
    if (!state?.user) {
      // Redirigir al usuario si no está autenticado
      handleRedirect();
    } else {
      // Alternar el estado del modal
      setIsModalOpen((prev) => !prev);
    }
  };

  return (
    <div
      id="contactUs"
      className="flex flex-col justify-start items-center text-center"
    >
      <Image
        src="/home/new_home/archivo.png"
        alt="No hay alojamientos disponibles"
        width={150}
        height={150}
      />
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">{title}</h2>
      <p className="text-lg text-gray-600 mt-2">{description}</p>
      <button
        onClick={toggleModal}
        className="mt-6 bg-[#5ce0e5] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5ce0e5df] transition"
      >
        Contáctanos
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && <RequestForm toggleModal={toggleModal} data={state.user} filters={filters} />}
      </AnimatePresence>
    </div>
  );
};

export default RequestSection;
