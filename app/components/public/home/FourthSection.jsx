import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import FourthSectionCard from "./FourthSectionCard";

const testimonials = [
  {
    text: "Una gran agencia, 100% recomendada! Alquilé una habitación por 5 meses durante mi semestre en Valencia y tuve una estancia estupenda. El apartamento fue renovado recientemente, tenía todas las comodidades necesarias y cuando necesitaba algo, el equipo de Helloflatmate actuó de inmediato. ¡Gracias por todo!",
    name: "Lidia",
    location: "España",
    stars: 5,
  },
  {
    text: "Recomiendo Helloflatemate a cualquiera, he estado con ellos durante 5 años, sin problemas, son muy amables, dan muy buen servicio y casas bien mantenidas. Mónica y Alberto siempre dispuestos a ayudar si necesitaba algo que era muy agradable.Disfruté mucho de mi estancia con ellos.",
    name: "Nancy",
    location: "USA",
    stars: 5,
  },
  {
    text: "¡Chicos agradables y serviciales que trabajan en HelloFlatmates! Realmente aprecio la respuesta rápida y solidaria del equipo en situaciones de emergencia. 1 estrella menos, solo intenta ser mejor... :)",
    name: "Shashwat",
    location: "UK",
    stars: 4,
  },
  {
    text: "Después de una larga búsqueda de apartamento en Valencia finalmente encontré un apartamento cómodo en una ubicación fantástica con HelloFlatMate. Su servicio al cliente fue excepcional, siempre respondieron los correos electrónicos",
    name: "Daniel",
    location: "Spain",
    stars: 5,
  },
];

export default function FourthSection() {
  const scrollContainerRef = useRef(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.matchMedia("(min-width: 640px)").matches // 640px es el breakpoint "sm" en Tailwind
        ? 47 * 16 // 47rem en píxeles (1rem = 16px)
        : 300; // Desplazamiento predeterminado para pantallas pequeñas

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.matchMedia("(min-width: 640px)").matches
        ? 47 * 16 // 47rem en píxeles
        : 300;

      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="flex flex-col gap-6 bg-white items-center justify-around my-10 px-4">
      <div className="relative space-y-2 w-full max-w-screen-xl">
        <h1 className="text-3xl font-bold text-center">
          Lo que dicen nuestros flatmates
        </h1>
        <div className="flex gap-4 justify-end w-full">
          <button
            className="text-gray-400 hover:text-gray-600 transition"
            onClick={scrollPrev}
          >
            <ArrowLeftCircleIcon className="w-[2rem] h-[2rem]" />
          </button>
          <button
            className="text-gray-400 hover:text-gray-600 transition"
            onClick={scrollNext}
          >
            <ArrowRightCircleIcon className="w-[2rem] h-[2rem]" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 py-6 scrollbar-none w-full max-w-screen-xl"
      >
        {testimonials.map((testimonial, index) => (
          <FourthSectionCard
            key={index}
            star={testimonial.stars}
            text={testimonial.text}
            name={testimonial.name}
            location={testimonial.location}
          />
        ))}
      </div>
    </section>
  );
}
