import React from "react";
import InfoCard from "./auxiliarComponents/InfoCard";

const list = [
  {
    img: "/home/building.svg",
    title: "Alojamientos en zonas consolidadas",
    description:
      "Un lugar seguro y sin complicaciones, con todo lo que necesitas para estudiar, labrarte un futuro y forjar amistades para toda la vida.",
  },
  {
    img: "/home/contract.svg",
    title: "Contratos",
    description:
      "Es crucial contar con un contrato de alquiler para una residencia legal. Todos nuestros alojamientos siguen un modelo contractual basado en el Código Civil, equiparando derechos y responsabilidades para arrendadores y arrendatarios.",
  },
  {
    img: "/home/support.svg",
    title: "Soporte",
    description:
      "La atención a flatmates es de 9 a 17 horas de lunes a viernes. Emergencias 24/7: Perfecto para cuando se te han olvidado las llaves en casa fuera de horario.",
  },
  {
    img: "/home/house.svg",
    title: "Alojamientos preparados",
    description:
      "Nos encargamos de que los alojamientos estén limpios y revisados para el día de inicio de contrato y así disfrutes de una bienvenida cómoda.",
  },
  {
    img: "/home/maintenance.svg",
    title: "Mantenimiento propio",
    description:
      "Los alojamientos con contratos de 5 meses se pintan y revisan dos veces al año. En contratos de 10 y 11 meses, esta revisión es anual. Para asistencia técnica durante tu estancia, contáctanos por WhatsApp en horario laboral.",
  },
  {
    img: "/home/supplies.svg",
    title: "Alta de suministros",
    description:
      "Todos nuestros alojamientos a excepción de hello studios, vienen con altas de luz, agua e internet wifi.",
  },
];

const InfoSection = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center gap-4 py-20 pt-10">
      <div className="flex flex-col justify-center items-start gap-10 max-w-screen-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-medium">
          ¿Por qué elegir helloflatmate?
        </h2>
        <div className="flex flex-row flex-wrap justify-around items-center gap-4">
          {list.map((item) => {
            return (
              <InfoCard
                img={item.img}
                title={item.title}
                description={item.description}
                key={item.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
