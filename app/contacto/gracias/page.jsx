import React from "react";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import Footer_1 from "@/app/components/public/home/Footer";
import Link from "next/link";

export const metadata = {
  title: "¡Gracias por Contactarnos! | helloflatmate",
  description:
    "Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible.",
  keywords: [
    "Gracias por Contactar",
    "Mensaje Recibido",
    "Atención al Cliente",
    "Soporte",
    "Contacto",
  ],
};

const ThanksPage = () => {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <header>
        <NavbarV3 />
      </header>

      <section className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ¡Gracias por Contactarnos! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Hemos recibido tu mensaje y nos pondremos en contacto contigo lo
            antes posible.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
            <Link
              href="/"
              className="px-6 py-3 text-blue-500 font-medium text-lg"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer_1 />
    </main>
  );
};

export default ThanksPage;
