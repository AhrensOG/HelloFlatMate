import React from "react";
import NavbarV3 from "../components/nav_bar/NavbarV3";
import Footer_1 from "../components/public/home/Footer";
import ContactForm from "../components/public/contact/ContactForm";

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
