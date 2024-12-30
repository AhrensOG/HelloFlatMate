import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import FourthSectionCard from "./FourthSectionCard";
import { useTranslations } from "next-intl";

const testimonials = [
    {
        text: "Fue la primera vez que usé la plataforma y me pareció muy profesional y fácil. Incluso me contactó alguien del staff para ayudarme a completar los pasos requeridos. Totalmente recomendable.",
        name: "Luise Aymar",
        location: "Germany",
        stars: 5,
    },
    {
        text: "El servicio fue excepcional y me ayudaron en todo momento. Definitivamente volveré a usarlo.",
        name: "John Doe",
        location: "USA",
        stars: 5,
    },
    {
        text: "Una experiencia increíble, el equipo fue muy atento y resolvieron todas mis dudas rápidamente.",
        name: "Jane Smith",
        location: "UK",
        stars: 5,
    },
    {
        text: "Recomiendo este servicio a todos mis amigos. Muy satisfecho con la atención recibida.",
        name: "Carlos Pérez",
        location: "Spain",
        stars: 5,
    },
];

export default function FourthSection() {
    const scrollContainerRef = useRef(null);
    const t = useTranslations("home");
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
                <h1 className="text-3xl font-bold text-center">{t("home_fourth_sect_1_title")}</h1>
                <div className="flex gap-4 justify-end w-full">
                    <button className="text-gray-400 hover:text-gray-600 transition" onClick={scrollPrev}>
                        <ArrowLeftCircleIcon className="w-[2rem] h-[2rem]" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition" onClick={scrollNext}>
                        <ArrowRightCircleIcon className="w-[2rem] h-[2rem]" />
                    </button>
                </div>
            </div>
            <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 py-6 scrollbar-none w-full max-w-screen-xl">
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
