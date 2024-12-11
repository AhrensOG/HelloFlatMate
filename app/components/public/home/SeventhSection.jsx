"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const AccordionItemV2 = ({ title, content, bgColor, titleColor, contentColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-300 ${bgColor}  rounded-xl p-3`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className={`font-semibold ${titleColor} text-xl`}>{title}</span>
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
        <div className={`p-4 ${contentColor} text-lg`}>{content}</div>
      </motion.div>
    </div>
  );
};

const SeventhSection = ({dropdownColor = "bg-white", bgColor = "bg-violet-300", titleDropdownColor = "text-gray-800", contentDropdownColor = "text-gray-600"}) => {
  const items = [
    {
      title: "Costes del servicio en hellostudio",
      content:
        "helloflatmate trabaja con estudiantes, nómadas digitales internacionales y personas en prácticas de empresa. Ninguno/a mayor de 30 años, excepto en los pisos para nómadas digitales o colivings, donde se permite hasta los 35 años.",
    },
    {
      title: "Costes de servicio en hellorooms, hellolandlord y hellocoliving",
      content:
        "helloflatmate trabaja con estudiantes, nómadas digitales internacionales y personas en prácticas de empresa. Ninguno/a mayor de 30 años, excepto en los pisos para nómadas digitales o colivings, donde se permite hasta los 35 años.",
    },
    {
      title: "¿Con qué tipo de público trabaja helloflatmate?",
      content:
        "helloflatmate trabaja con estudiantes, nómadas digitales internacionales y personas en prácticas de empresa. Ninguno/a mayor de 30 años, excepto en los pisos para nómadas digitales o colivings, donde se permite hasta los 35 años.",
    },
    {
      title: "¿Qué condiciones se aplican a contratos de larga estancia?",
      content:
        "En contratos de alquiler de larga estancia (mínimo 5 años), regulados por la Ley de Arrendamientos Urbanos (LAU) y la Ley de Vivienda 12/23, el arrendatario está exento de pagar comisión por los servicios de intermediación.",
    },
  ];

  return (
    <div className={`w-full flex flex-col justify-center items-center py-16 px-2 ${bgColor} space-y-10`}>
      <h2 className="text-4xl font-bold text-gray-800 text-center">
      ¿Alguna duda?
      </h2>
      <div className="max-w-screen-lg w-full space-y-4">
        {items.map((item, index) => (
          <AccordionItemV2
            key={index}
            title={item.title}
            content={item.content}
            bgColor={dropdownColor}
            titleColor={titleDropdownColor}
            contentColor={contentDropdownColor}
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
