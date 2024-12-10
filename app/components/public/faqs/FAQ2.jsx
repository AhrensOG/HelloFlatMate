"use client";
import { useState } from "react";
import { motion } from "framer-motion";

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
          <motion.div
            className="absolute inset-3 left-1 w-4 h-[1px] bg-gray-500"
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          />
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

const FAQ2 = () => {
  const items = [
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
    {
      title: "¿Qué tipo de apartamentos ofrece helloflatmate?",
      content:
        "La cartera incluye apartamentos semi-amueblados o sin amueblar, algunos con alta de suministros requerida (luz, agua, gas).",
    },
    {
      title: "¿Cuánto cuesta el servicio de gestión de hello rooms y hello landlord?",
      content:
        "El coste de honorarios de gestión es de 459,80 euros, IVA incluido, pagadero el día del check-in mediante tarjeta bancaria.",
    },
    {
      title: "¿Qué es lo que se paga con la reserva de la habitación a través de la web de helloflatmate?",
      content:
        "La persona que reserva la habitación está abonando la renta del primer mes de contrato de la habitación seleccionada.",
    },
    {
      title: "¿Si llego al piso el 15 de septiembre, por ejemplo, tengo que pagar todo el mes?",
      content:
        "Depende: si se reserva la habitación con anterioridad, se deberá pagar el mes completo. Si se entra a la habitación después de la fecha de inicio del contrato, se pagará la parte proporcional del mes.",
    },
    {
      title: "¿Puedo cancelar mi reserva y que me devuelvan el dinero?",
      content:
        "Depende: se devuelve el 100% del importe si se cancela al menos 30 días antes del inicio del contrato. Cancelaciones con menos de 30 días no tienen derecho a reembolso.",
    },
    {
      title: "¿Puede el propietario cancelar mi reserva?",
      content:
        "Sí, el propietario puede cancelar con un mínimo de 30 días de antelación. helloflatmate ofrece la opción de trasladar la reserva a otra habitación similar o devolver el 100% del dinero.",
    },
    {
      title: "Si tengo un contrato de 5 meses y sólo me quedo 3, ¿tengo que pagar 5?",
      content:
        "Sí, pero si se avisa con 30 días de antelación, helloflatmate ayudará a encontrar un nuevo inquilino/a para sustituir el contrato.",
    },
    {
      title: "¿Las facturas están incluidas?",
      content:
        "No, excepto en hello coliving, donde están incluidas con un tope máximo de 50€ al mes por persona.",
    },
    {
      title: "¿Las facturas de mantenimiento del edificio están incluidas?",
      content:
        "Sí, los flatmates están exentos de pagar gastos comunitarios como ascensor, limpieza o reparaciones del edificio.",
    },
    {
      title: "¿Hay internet? ¿Cómo se realizan los pagos de internet?",
      content:
        "Sí, hay internet con una cuota fija de 16 €/mes, pagadera cada 5 meses por adelantado (80 €/habitación), excepto en hello studios.",
    },
    {
      title: "¿Cómo se pagan las facturas de agua, luz y gas?",
      content:
        "En hello rooms y hello studios, los pagos se hacen al inicio del contrato y a mitad del mismo. Este importe se entrega al propietario y se regulariza con las facturas reales.",
    },
    {
      title: "¿Cómo estaré enterado/a del gasto de electricidad y agua?",
      content:
        "helloflatmate informa mediante un informe a través de un canal informativo específico.",
    },
    {
      title: "¿Qué hago si hay desperfectos en la habitación?",
      content:
        "helloflatmate realiza un inventario fotográfico al que se tiene acceso. Si encuentra un desperfecto no reflejado, notifíquelo durante los tres primeros días desde su llegada.",
    },
    {
      title: "¿Qué hago si el día del check-in la habitación no está limpia como debería?",
      content:
        "Avise a helloflatmate, y el mismo día se enviará personal de limpieza.",
    },
    {
      title: "¿Qué hago si las zonas comunes no están bien al llegar?",
      content:
        "Avise a helloflatmate, y se organizará personal de limpieza. El coste será descontado de la fianza de los flatmates actuales.",
    },
    {
      title: "¿Qué fianza tengo que entregar? ¿Cuándo y cómo lo hago?",
      content:
        "hello rooms y hello landlord requieren una fianza de 300€. hello coliving requiere 550€, y hello studios, una mensualidad. Se devuelve entre 30-45 días tras finalizar el contrato.",
    },
    {
      title: "¿Puede venir familia y amigos a visitarme y dormir en el piso?",
      content:
        "Sí, con al menos 2 días de antelación y la aprobación de los flatmates. Para estancias superiores a dos días, se pueden pedir 5€ por día para cubrir gastos.",
    },
    {
      title: "¿Se admiten mascotas?",
      content: "No, aunque nos encantan.",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center py-16 px-2 bg-[#FFE5F7] space-y-10">
      <h2 className="text-4xl font-bold text-gray-800 text-center">
        ¿Alguna duda?
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
    </div>
  );
};

export default FAQ2;
