import { MapPinIcon, StarIcon } from "@heroicons/react/20/solid";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoutSectionCard from "./FoutSectionCard";

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

export default function FourtSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonials = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
    };

    const prevTestimonials = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="flex flex-col gap-3 bg-white items-center justify-around my-10 px-2">
            <div className="relative space-y-2">
                <h1 className="text-3xl font-bold">Dicen que nuestro servicio al cliente es el mejor</h1>
                <div className="flex gap-4 justify-end w-full">
                    <button className="text-gray-400 cursor-default " onClick={prevTestimonials} disabled={currentIndex === 0}>
                        <ArrowLeftCircleIcon className="w-[2rem] h-[2rem]" />
                    </button>
                    <button className="cursor-pointer" onClick={nextTestimonials} disabled={currentIndex >= testimonials.length - 2}>
                        <ArrowRightCircleIcon className="w-[2rem] h-[2rem]" />
                    </button>
                </div>
            </div>
            <div className="flex gap-4 my-10">
                <AnimatePresence>
                    {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
                        <FoutSectionCard
                            key={index}
                            star={testimonial.stars}
                            text={testimonial.text}
                            name={testimonial.name}
                            location={testimonial.location}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
