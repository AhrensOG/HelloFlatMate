"use client";
import Image from "next/image";
import NavbarV3 from "@/app/components/nav_bar/NavbarV3";
import Footer_1 from "@/app/components/public/home/Footer";
import FAQ2 from "@/app/components/public/faqs/FAQ2";
import SeventhSection from "@/app/components/public/home/SeventhSection";
import HTMLReactParser from "html-react-parser";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            bgColor: "bg-white",
            title: "Solicita tu reserva",
            description:
                "Explora nuestras opciones de alojamiento y encuentra la casa perfecta para ti. Gracias a nuestras visitas guiadas y descripciones detalladas de cada propiedad y su barrio, realizadas por el equipo de helloflatmate, tendrás toda la información necesaria para tomar una buena decisión. Si tienes dudas, ¡escríbenos! Nuestros agentes en Valencia están aquí para ayudarte a encontrar el mejor alojamiento para tí.",
            subpoints: [
                {
                    title: "Verificamos las propiedades",
                    description:
                        "Ofrecemos fotografías y vídeos reales de las propiedades en lugar de usar materiales de terceros. Si algo no está claro, puedes solicitar información para motivarte a hacer el último esfuerzo de ir a la casa.",
                },
                {
                    title: "Descripción detallada",
                    description: "Encuentra toda la información que necesitas antes de reservar.",
                },
            ],
            icon: "/howitworks/buscar.png", // Usa emojis o un ícono SVG como placeholder
        },
        {
            id: 2,
            bgColor: "bg-white",
            title: "Reserva tu alojamiento",
            description:
                "Confirma tu elección leyendo previamente nuestras condiciones de reserva y las condiciones del alojamiento, si las cumples, ¡Adelante!, es tuya. La reserva corresponderá a la primera mensualidad del contrato de alquiler y se gestiona a través de helloflatmate para garantizar las políticas de cancelación y una óptima entrega del inmueble. Siendo transferida la primera mensualidad del alquiler al propietario 48 horas después de tu llegada, salvo que nos informes de algún inconveniente antes de ese plazo.",
            subpoints: [
                {
                    title: "¿Qué estoy pagando?",
                    description:
                        "Pago inicial: Cubre parte de la estancia y las tasas de reserva de helloflatmate. El importe se transferirá al propietario 48 horas después de tu fecha de entrada si no se documenta ningún problema.",
                },
                {
                    title: "Confirmación de reserva",
                    description: "Una vez realizada la reserva, recibirás confirmación inmediata.",
                },
            ],
            icon: "/howitworks/reserva.png",
        },
        {
            id: 3,
            bgColor: "bg-white",
            title: "Organiza tu llegada a Valencia.",
            description: `Firma el contrato digitalmente.

-Cierra una cita desde el calendario de check in para la entrega de llaves en nuestras oficinas y formalización de contrato.


 Para ello deberás realizar los pagos desde nuestras oficinas mediante tarjeta bancaria de:

Tasa del servicio

Fianza

Suministros y wifi (Que dependerán del tipo de alojamiento)

`,
            subpoints: [
                {
                    title: "Estamos aquí para ayudarte",
                    description: "Nuestro equipo de atención al cliente está disponible para ayudarte en cualquier momento.",
                },
            ],
            icon: "/howitworks/verificado.gif",
        },
        {
            id: 4,
            bgColor: "bg-[#f7f5f5]",
            title: "Fecha de entrada",
            description:
                "Si ves todo bien, la casa es tuya. El propietario será tu punto de contacto a partir de ahora. Si tienes algún problema con la comunicación, Spotahome estará aquí para ayudarte.",
            subpoints: [
                {
                    title: "Un último consejo",
                    description:
                        "No olvides que el momento de la firma del contrato es esencial para garantizar tus derechos como inquilino. Sigue las instrucciones y confirma las condiciones con el propietario.",
                },
            ],
            icon: "/howitworks/llave.png",
        },
    ];

    const t = useTranslations("how_it_works");

    const formatedStrong = (text) => {
        return text.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };

    return (
        <section className="bg-white w-full">
            <header>
                <NavbarV3 />
            </header>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-screen-md flex flex-col justify-center items-center px-2 py-10">
                    <h1 className="text-center text-4xl font-extrabold mb-10 ml-24 max-w-96">{t("title")}</h1>
                    <div className="space-y-10">
                        <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/buscar.png"} width={100} height={100} alt={"Busca y elige tu hogar ideal"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-center">{t("step_1_title")}</h2>
                                <p className="text-gray-700 mb-6 text-center">{t("step_1_text")}</p>
                            </div>
                        </div>
                        <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/reserva.png"} width={100} height={100} alt={"Reserva tu alojamiento"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-center">{t("step_2_title")}</h2>
                                <p className="text-gray-700 mb-6 text-center">{HTMLReactParser(formatedStrong(t("step_2_text")))}</p>
                            </div>
                        </div>
                        <div className={`flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/evento.png"} width={100} height={100} alt={"Organiza tu llegada a Valencia"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-center">{t("step_3_title")}</h2>
                                <h2 className="text-xl text-center font-bold mb-4 jus ">{t("step_3_title_2")}</h2>
                                <p className="text-gray-700 mb-6 text-center">{HTMLReactParser(formatedStrong(t("step_3_text")))}</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-center text-2xl mb-10 w-full">{HTMLReactParser(formatedStrong(t("title_final")))}</h2>
                </div>
            </div>
            <SeventhSection />
            <Footer_1 />
        </section>
    );
}