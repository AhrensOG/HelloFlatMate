"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AccordionItemV2 = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 bg-white rounded-xl p-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className="font-semibold text-gray-800 text-xl">{title}</span>
        <div className="relative w-6 h-6">
          {/* Línea horizontal */}
          <motion.div
            className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Línea vertical */}
          <motion.div
            className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
            animate={{ rotate: isOpen ? 0 : 90 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 text-gray-600 text-lg">{content}</div>
      </motion.div>
    </div>
  );
};

const SeventhSection = () => {
  const items = [
    {
      title: "¿Puedo cancelar una reserva?",
      content:
        "Puedes cancelar tu reserva cuando quieras. Así es como funciona: No se te cobrará por la cancelación de la reserva si aún no ha sido aceptada por el propietario. Pero si cancelas tras ser aceptado, la cuota de Spotahome no será reembolsada, y puedes perder la parte de la renta que pagaste por adelantado.",
    },
    {
      title: "¿Puedo visitar la propiedad antes de reservar?",
      content:
        "Por ahora, no es posible visitar la propiedad antes de reservar.",
    },
    {
      title: "¿Con quién viviré?",
      content:
        "Toda la información sobre tus compañeros de piso estará en el anuncio.",
    },
    {
      title: "¿Qué es un Homechecker?",
      content:
        "Un Homechecker es un experto que verifica propiedades para garantizar la exactitud del anuncio.",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center py-16 px-2 bg-[#FFE5F7] space-y-10">
      <h2 className="text-4xl font-bold text-gray-800 text-center">
        ¿Todavía no lo tienes claro?
      </h2>
      <div className="max-w-screen-lg w-full space-y-4">
        {items.map((item, index) => (
          <AccordionItemV2
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
        </div>
      <div className="font-bold text-gray-600 text-center">
        ¿Tienes una pregunta diferente?
        <Link href={"/faq"} target="_blank" className="pl-1 text-gray-700 underline">
          Descubre más
        </Link>
      </div>
    </div>
  );
};

export default SeventhSection;
