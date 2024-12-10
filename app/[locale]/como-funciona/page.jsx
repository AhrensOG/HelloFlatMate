"use client";
import Image from "next/image";
import NavBar_1 from "../../components/public/home/NavBar_1";
import Footer_1 from "../../components/public/home/Footer";

export default function HowItWorks() {
    const steps = [
        {
            id: 1,
            bgColor: "bg-white",
            title: "Busca y elige tu hogar ideal",
            description:
                "Explora nuestras opciones de alojamiento y encuentra la casa perfecta para ti. Gracias a nuestras visitas guiadas y descripciones detalladas de cada propiedad y su barrio, realizadas por el equipo de hello flat mate, tendrás toda la información necesaria para tomar una buena decisión. Si tienes dudas, ¡escríbenos! Nuestros agentes en Valencia están aquí para ayudarte a encontrar el mejor alojamiento para tí.",
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
            icon: "/howitworks/buscar.gif", // Usa emojis o un ícono SVG como placeholder
        },
        {
            id: 2,
            bgColor: "bg-white",
            title: "Reserva tu alojamiento",
            description:
                "Confirma tu elección leyendo previamente nuestras condiciones de reserva y las condiciones del alojamiento, si las cumples, ¡Adelante!, es tuya. La reserva corresponderá a la primera mensualidad del contrato de alquiler y se gestiona a través de hello flat mate para garantizar las políticas de cancelación y una óptima entrega del inmueble. Siendo transferida la primera mensualidad del alquiler al propietario 48 horas después de tu llegada, salvo que nos informes de algún inconveniente antes de ese plazo.",
            subpoints: [
                {
                    title: "¿Qué estoy pagando?",
                    description:
                        "Pago inicial: Cubre parte de la estancia y las tasas de reserva de hello flat mate. El importe se transferirá al propietario 48 horas después de tu fecha de entrada si no se documenta ningún problema.",
                },
                {
                    title: "Confirmación de reserva",
                    description: "Una vez realizada la reserva, recibirás confirmación inmediata.",
                },
            ],
            icon: "/howitworks/reserva.gif",
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
            icon: "/howitworks/llave.gif",
        },
    ];

    return (
        <section className="bg-white w-full">
            <header>
                <NavBar_1 />
            </header>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-screen-md flex flex-col justify-center items-center px-2 py-10">
                    <h1 className="text-center text-4xl font-extrabold mb-10 max-w-96">3 simples pasos y listo</h1>
                    <div className="space-y-10">
                        <div className={`flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/buscar.gif"} width={100} height={100} alt={"Busca y elige tu hogar ideal"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">1. Busca y elige tu hogar ideal</h2>
                                <p className="text-gray-700 mb-6">
                                    Explora nuestras opciones de alojamiento y encuentra la casa perfecta para ti. Gracias a nuestras visitas guiadas
                                    y descripciones detalladas de cada propiedad y su barrio, realizadas por el equipo de{" "}
                                    <strong>hello flat mate</strong>, tendrás toda la información necesaria para tomar una buena decisión. Si tienes
                                    dudas, ¡escríbenos! Nuestros agentes en Valencia están aquí para ayudarte a encontrar el mejor alojamiento para
                                    tí.
                                </p>

                                {/* <div className="grid grid-cols-2 gap-4">
                  {step.subpoints.map((point, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">
                        {point.title}
                      </h3>
                      <hr className="border-t border-gray-300 my-2" />
                      <p className="text-gray-700">{point.description}</p>
                    </div>
                  ))}
                </div> */}
                            </div>
                        </div>
                        <div className={`flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/reserva.gif"} width={100} height={100} alt={"Reserva tu alojamiento"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">2. Reserva tu alojamiento</h2>
                                <p className="text-gray-700 mb-6">
                                    Confirma tu elección leyendo previamente nuestras condiciones de reserva y las condiciones del alojamiento, si las
                                    cumples, ¡Adelante!, es tuya. La reserva corresponderá a la primera mensualidad del contrato de alquiler y se
                                    gestiona a través de <strong>hello flat mate</strong> para garantizar las políticas de cancelación y una óptima
                                    entrega del inmueble. Siendo transferida la primera mensualidad del alquiler al propietario 48 horas después de tu
                                    llegada, salvo que nos informes de algún inconveniente antes de ese plazo.
                                </p>

                                {/* <div className="grid grid-cols-2 gap-4">
                  {step.subpoints.map((point, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">
                        {point.title}
                      </h3>
                      <hr className="border-t border-gray-300 my-2" />
                      <p className="text-gray-700">{point.description}</p>
                    </div>
                  ))}
                </div> */}
                            </div>
                        </div>
                        <div className={`flex gap-6 items-start bg-white p-6 rounded-lg shadow-sm`}>
                            <Image src={"/howitworks/evento.gif"} width={100} height={100} alt={"Organiza tu llegada a Valencia"} />

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">3. Organiza tu llegada a Valencia</h2>
                                <p className="text-gray-700 mb-6">
                                    -Firma el contrato digitalmente. <br />
                                    -Cierra una cita desde el calendario de check in para la entrega de llaves en nuestras oficinas y formalización de
                                    contrato.
                                    <br /> Para ello deberás realizar los pagos desde nuestras oficinas mediante tarjeta bancaria de:
                                    <br /> Tasa del servicio
                                    <br /> Fianza <br />
                                    Suministros y wifi (Que dependerán del tipo de alojamiento)
                                </p>

                                {/* <div className="grid grid-cols-2 gap-4">
                  {step.subpoints.map((point, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">
                        {point.title}
                      </h3>
                      <hr className="border-t border-gray-300 my-2" />
                      <p className="text-gray-700">{point.description}</p>
                    </div>
                  ))}
                </div> */}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-center text-2xl mb-10 w-full">
                        ¡Bienvenidos a Valencia, bienvenidos a <strong>hello flat mate</strong>!
                    </h2>
                    <OurWarranties />
                </div>
            </div>
            <Footer_1 />
        </section>
    );
}

const OurWarranties = () => {
    const warranties = [
        {
            icon: "/howitworks/blindaje.gif",
            title: "Protección contra fraude",
            description: "Si todo va bien, realizaremos la transferencia al propietario 48 horas después de la fecha de entrada.",
        },
        {
            icon: "/howitworks/verificado.gif",
            title: "Verificada por Spotahome",
            description: "Ofrecemos fotografías y vídeo reales de cada propiedad en lugar de usar materiales de terceros.",
        },
    ];

    return (
        <section className="py-12 bg-white w-full">
            <div className="container mx-auto px-2 sm:px-0">
                <h2 className="text-2xl font-bold mb-8">Nuestras garantías</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {warranties.map((warranty, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <Image src={warranty.icon} width={100} height={100} alt={warranty.title} />
                            <h3 className="mt-4 text-lg font-semibold">{warranty.title}</h3>
                            <p className="mt-2 text-gray-600">{warranty.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
