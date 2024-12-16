"use client";
import React from "react";
import NavBar_1 from "../../components/public/home/NavBar_1";
import Footer_1 from "../../components/public/home/Footer";
import SecondaryNavbar from "../../components/public/home/SecondaryNavbar";
import Image from "next/image";
import Link from "next/link";
import HTMLReactParser from "html-react-parser";
import { useTranslations } from "next-intl";

const AboutUs = () => {
    const t = useTranslations("about_us");

    const formatedStrong = (text) => {
        return text.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };

    return (
        <section className="bg-white w-full">
            {/* Header con imagen de fondo */}
            <header className="bg-[url('/home/new_home/bg.jpg')] bg-cover bg-no-repeat bg-bottom">
                <SecondaryNavbar />
                <div className="w-full flex justify-center items-center py-40">
                    <h1 className="text-2xl font-bold max-w-screen-lg text-center text-white">{t("title")}</h1>
                </div>
            </header>

            {/* Nueva sección con el contenido */}
            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-2xl font-bold mb-8">{t("title_2")}</h2>
                <div className="space-y-8 text-lg text-center">
                    <p>{HTMLReactParser(formatedStrong(t("first_text")))}</p>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-2xl font-bold mb-8">{t("title_3")}</h2>
                <div className="space-y-8 text-lg text-center">
                    <p>{HTMLReactParser(formatedStrong(t("second_text")))}</p>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto py-16 px-4">
                <h2 className="text-center text-4xl font-bold mb-14">{t("title_4")}</h2>
                <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-4">
                    {/* Primer artículo */}
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/diarioCritico.jpg" alt="El Confidencial" width={300} height={300} />
                        <Link
                            href="https://www.diariocritico.com/noticia/447879/sin-clasificar/helloflatmate-para-que-en-tu-llegada-a-valencia-te-sientas-como-en-casa.html"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            {t("link_1")}
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/lasprovincias.svg" alt="El Confidencial" width={150} height={150} />
                        <Link
                            href="https://www.lasprovincias.es/v/20140506/economia/valenciano-revoluciona-servicio-atencion-20140506.html?ref=https%3A%2F%2Fwww.lasprovincias.es%2Fv%2F20140506%2Feconomia%2Fvalenciano-revoluciona-servicio-atencion-20140506.html"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            {t("link_2")}
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/elperiodic.svg" alt="El Confidencial" width={150} height={150} />
                        <Link
                            href="https://www.elperiodic.com/valencia/estudiantes-internacionales-dispondran-facilidades-para-alojamiento-apartamentos_210855"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            {t("link_3")}
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Image src="/home/new_home/madridlogo.png" alt="El Confidencial" width={250} height={250} />
                        <Link
                            href="https://madridpress.com/archive/292601/la-importancia-de-alquilar-un-buen-piso-para-estudiantes-en-valencia"
                            target="_blank"
                            className="text-blue-600 underline mt-4"
                        >
                            {t("link_4")}
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
