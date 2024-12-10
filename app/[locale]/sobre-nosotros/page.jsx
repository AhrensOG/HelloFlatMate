"use client";
import React from "react";
import NavBar_1 from "../../components/public/home/NavBar_1";
import Footer_1 from "../../components/public/home/Footer";
import SecondaryNavbar from "../../components/public/home/SecondaryNavbar";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
    return (
        <section className="bg-white w-full">
            {/* Header con imagen de fondo */}
            <header className="bg-[url('/home/new_home/bg.jpg')] bg-cover bg-no-repeat bg-bottom">
                <SecondaryNavbar />
                <div className="w-full flex justify-center items-center py-40">
                    <h1 className="text-2xl font-bold max-w-screen-lg text-center text-white">
                        hello flat mate es la plataforma online de alquiler de pisos y habitaciones de media y larga estancia
                    </h1>
                </div>
            </header>

            {/* Nueva sección con el contenido */}
            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-2xl font-bold mb-8">¿Por qué es diferente hello flat mate?</h2>
                <div className="space-y-8 text-lg text-center">
                    <p>
                        Tu aliado desde Valencia para encontrar alojamiento de manera sencilla y segura. <br />
                        <br />
                        En <strong>hello flat mate</strong>, nos especializamos en ofrecer alojamiento para estudiantes y nómadas digitales que buscan
                        una experiencia única en Valencia. Nuestra plataforma combina una gestión profesional con un trato cercano, ayudando a jóvenes
                        internacionales y nacionales a encontrar su hogar ideal.
                        <br />
                        <br />A diferencia de otras opciones, en <strong>hello flat mate</strong> garantizamos un proceso de reserva claro y
                        eficiente, eliminando complicaciones desde el primer día.
                        <br />
                        <br />
                        Nos ocupamos de gestionar todos los aspectos de tu estancia, desde que llegas hasta que finalices tu contrato.
                        <br />
                        <br />
                        Ofrecemos una selección de habitaciones en pisos compartidos, exclusivamente diseñadas para estudiantes y nómadas digitales de
                        hasta 30 años, creando un ambiente de convivencia adaptado a tu estilo de vida. Además, operamos en las mejores zonas de la
                        ciudad, como Blasco Ibáñez, el Centro y Moncada, para que siempre estés cerca de tu universidad o lugar de trabajo.
                    </p>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-2xl font-bold mb-8">Así comenzó hello flat mate: una idea que nació en movimiento</h2>
                <div className="space-y-8 text-lg text-center">
                    <p>
                        Fundada por Alberto Borrás, es más que una agencia de servicios para estudiantes. Es un proyecto pensado para garantizar una
                        atención personalizada y exclusiva a jóvenes recién llegados a Valencia, asegurando que su experiencia sea fluida, segura y
                        adaptada a sus necesidades.
                        <br />
                        <br />
                        La inspiración para <strong>hello flat mate</strong> surgió mientras Alberto vivía en Bristol (Inglaterra), concretamente
                        cuando se mudaba a Londres.
                        <br />
                        <br />
                        Cargado con más equipaje del que podía manejar, sin alojamiento reservado porque no se fiaba, comenzó a soñar con un servicio
                        que hiciera más fácil la llegada a un lugar desconocido.
                        <br />
                        <br />
                        ¿Te imaginas que alguien nos esperara al llegar a Londres, nos ayudara con las maletas, los papeles y guiara en esos primeros
                        días?", recuerda Alberto haber pensado. <br />
                        <br />
                        Esa idea evolucionó hasta convertirse en una solución integral para estudiantes internacionales y nacionales que buscan
                        alojamiento en Valencia.
                        <br />
                        <br />
                        El objetivo no era sólo encontrar un espacio donde vivir, sino proporcionar un acompañamiento real en cada paso del proceso,
                        desde la llegada hasta la integración. <br />
                        <br />
                        Aunque Alberto insiste en que no fue el primero en ofrecer habitaciones para estudiantes en el mundo, sí tiene claro que{" "}
                        <strong>hello flat mate</strong> fue pionera en priorizar la adaptación de los jóvenes y su tranquilidad, ofreciendo mucho más
                        que un simple alojamiento. La clave está en los pequeños detalles: apoyo en gestiones administrativas, recomendaciones locales
                        y un servicio cercano que crea un impacto positivo en las vidas de los estudiantes. <br />
                        <br />
                        Respecto al futuro, Alberto y su equipo se muestran optimistas, aunque prefieren centrarse en el presente y seguir ofreciendo
                        un servicio de calidad. "El día a día está lleno de retos, pero los agradecimientos de las familias y los estudiantes son lo
                        que nos impulsa a seguir adelante", afirma.
                    </p>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-4xl font-bold mb-14">hello flat mate en los medios</h2>
                <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-4">
                    {/* Primer artículo */}
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/diarioCritico.jpg" alt="El Confidencial" width={300} height={300} />
                        <Link
                            href="https://www.diariocritico.com/noticia/447879/sin-clasificar/helloflatmate-para-que-en-tu-llegada-a-valencia-te-sientas-como-en-casa.html"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            hello flat mate, para que en tu llegada a Valencia te sientas como en casa
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/lasprovincias.svg" alt="El Confidencial" width={150} height={150} />
                        <Link
                            href="https://www.lasprovincias.es/v/20140506/economia/valenciano-revoluciona-servicio-atencion-20140506.html?ref=https%3A%2F%2Fwww.lasprovincias.es%2Fv%2F20140506%2Feconomia%2Fvalenciano-revoluciona-servicio-atencion-20140506.html"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            Un valenciano revoluciona el servicio de atención a estudiantes
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/elperiodic.svg" alt="El Confidencial" width={150} height={150} />
                        <Link
                            href="https://www.elperiodic.com/valencia/estudiantes-internacionales-dispondran-facilidades-para-alojamiento-apartamentos_210855"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            Estudiantes internacionales de la UCV dispondrán de facilidades para el alojamiento en apartamentos
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/madridlogo.png" alt="El Confidencial" width={250} height={250} />
                        <Link
                            href="https://madridpress.com/archive/292601/la-importancia-de-alquilar-un-buen-piso-para-estudiantes-en-valencia"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            La importancia de alquilar un buen piso para estudiantes en Valencia
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer_1 />
        </section>
    );
};

export default AboutUs;
