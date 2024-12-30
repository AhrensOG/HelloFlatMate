import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import ContactForm from "@/app/components/public/contact/ContactForm";
import Footer_1 from "@/app/components/public/home/Footer";
import React from "react";

export const metadata = {
    title: "Contacto | Comunícate con Nosotros",
    description:
        "Contáctanos para cualquier consulta o sugerencia. Completa nuestro formulario de contacto y nos pondremos en contacto contigo lo antes posible.",
    keywords: ["Contacto", "Formulario", "Consultas", "Soporte", "Ayuda"],
};

const ContactPage = () => {
    return (
        <main className="text-gray-800 min-h-screen flex flex-col w-full bg-white">
            {/* Navbar */}
            <header>
                <NavbarV3 />
            </header>

            {/* Contenido Principal */}
            <ContactForm />

            {/* Footer */}
            <Footer_1 />
        </main>
    );
};

export default ContactPage;
