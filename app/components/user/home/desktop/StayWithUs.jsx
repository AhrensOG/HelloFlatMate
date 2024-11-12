import React from "react";
import StayWithUsInfoCard from "./auxiliarComponents/StayWithUsInfoCard";

const list = [
  {
    img: "/home/helloroomIcon.png",
    title: "Más sobre helloroom",
    section: "helloroom",
    description:
      "Cada helloroom está equipada con todo lo que necesitas para tener éxito académico y disfrutar de tu vida universitaria. Desde escritorios amplios hasta espacios de almacenamiento eficiente, hemos pensado en cada detalle.",
  },
  {
    img: "/home/hellostudioIcon.png",
    title: "Conoce nuestros hellostudios",
    section: "hellostudio",
    description:
      "Si vienes a Valencia a estudiar toda la carrera y quieres la máxima independencia, hellostudios es para tí.",
  },
  {
    img: "/home/hellocolivingIcon.png",
    title: "Aprende sobre hellocoliving",
    section: "hellocoliving",
    description:
      "Nuestros acogedores y modernos alojamientos hellocoliving están diseñados específicamente para nómadas digitales que buscan un espacio listo para habitar desde el primer momento.",
  },
  {
    img: "/home/hellolandlordIcon.png",
    title: "Visita nuestros hellolandlord",
    section: "hellolandlord",
    description:
      "Nuestras hellolandlord son habitaciones gestionadas por propietarios de confianza, diseñadas para estudiantes nacionales e internacionales que buscan un espacio listo para habitar al llegar a Valencia por menos de un año.",
  },
];

const StayWithUs = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center gap-4 py-20 pt-10">
      <div className="flex flex-col justify-center items-start gap-10 max-w-screen-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-medium">
          Alójate con nosotros
        </h2>
        <div className="flex flex-row flex-wrap justify-around sm:justify-between items-center gap-4">
          {list.map((item) => {
            return (
              <StayWithUsInfoCard
                img={item.img}
                title={item.title}
                description={item.description}
                key={item.title}
                section={item.section}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StayWithUs;
