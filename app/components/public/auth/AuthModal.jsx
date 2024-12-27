import { plus_jakarta, poppins } from "@/font";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const modalVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: "0%" },
};

export default function AuthModal({ isOpen, handleAccept, handleReject }) {
    const [acceptsAdvertising, setAcceptsAdvertising] = useState({
        ads: false,
        no_ads: false,
    });

    const handlePrivacyChoice = (checked, type) => {
        setAcceptsAdvertising((prev) => ({
            ...prev,
            [type]: checked,
        }));
    };

    // Verificar si al menos uno de los checkboxes está marcado
    const isButtonEnabled = acceptsAdvertising.ads || acceptsAdvertising.no_ads;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    className="fixed z-50 inset-0 flex items-center justify-center overflow-auto bg-white self-end"
                    variants={modalVariants}
                    style={{ height: "100vh" }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 1 }}
                >
                    <div className="h-[100vh] fixed inset-0 transition-opacity self-end" aria-hidden="true">
                        <div className="absolute inset-0 opacity-75"></div>
                    </div>

                    <div
                        className="h-[100vh] bg-white rounded-lg text-left overflow-auto transform transition-all sm:max-w-lg sm:w-full scrollbar-thin"
                        role="dialog"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <div className=" grow bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-auto flex flex-col">
                            <button className="self-center pb-5" onClick={handleReject}>
                                <Image src={"/icon-close-modal-auth.svg"} width={36} height={5} alt="Boton para cerrar el modal" />
                            </button>
                            <h1
                                id="modal-title"
                                className={`${poppins.className} pb-3 text-center text-xl font-semibold leading-6 text-gris-antracita`}
                            >
                                Términos de uso helloflamate
                            </h1>
                            <section id="modal-description" className={`  mt-2 font-normal text-sm flex flex-col gap-2 items-center`}>
                                <p>
                                    Al descargar, acceder o utilizar esta aplicación, aceptas los siguientes{" "}
                                    <span>
                                        <Link href="/pages/privacy-policy" className="font-bold text-resolution-blue" target="_blank">
                                            terminos y condiciones
                                        </Link>
                                    </span>
                                    . Si no estás de acuerdo con ellos, te rogamos que no utilices la app.
                                </p>
                                <ol className="list-decimal self-center pl-3">
                                    <li>
                                        <h6>Registro Exclusivo por la Administración</h6>
                                        <ul className="list-disc pl-3">
                                            <li>
                                                Solo la administración de helloflamate está autorizada para crear y activar perfiles de propietarios
                                                en la plataforma. Ningún usuario puede auto-registrarse como propietario sin la intervención y
                                                aprobación de la administración.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h6>Proceso de Verificación de Documentación:</h6>
                                        <ul className="list-disc pl-3">
                                            <li>
                                                Para solicitar la activación de un perfil de propietario, los interesados deberán contactar
                                                directamente con helloflamate a través de la sección dedicada en nuestra plataforma. Los propietarios
                                                potenciales deberán proporcionar toda la documentación requerida para verificar su identidad y la
                                                titularidad de la propiedad.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h6>Aprobación de la Cuenta:</h6>
                                        <ul className="list-disc pl-3">
                                            <li>
                                                Una vez recibida y revisada la documentación, la administración de helloflamate determinará si el
                                                perfil cumple con los criterios necesarios para ser activado. La decisión de aprobar o rechazar la
                                                creación de un perfil será comunicada al solicitante por los medios establecidos.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h6>Uso del Perfil:</h6>
                                        <ul className="list-disc pl-3">
                                            <li>
                                                El perfil del propietario debe ser utilizado de acuerdo con las políticas y términos establecidos por
                                                helloflamate. Cualquier uso indebido del perfil o de la plataforma puede resultar en la desactivación
                                                del mismo.
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </section>
                            {/* Información adicional */}
                            <section className="mt-6">
                                <h2 className="text-lg font-semibold text-gris-antracita mb-2">Información adicional</h2>
                                <p className="text-sm text-gray-600">
                                    De conformidad con lo que establece la legislación vigente en materia de Protección de Datos de Carácter Personal,
                                    se le informa que:
                                </p>
                                <ul className="list-disc pl-4 text-sm text-gray-600">
                                    <li>
                                        Los datos personales serán tratados por HELLO FLAT MATE, S.L. con la finalidad de gestionar su alta como
                                        usuario registrado.
                                    </li>
                                    <li>
                                        Para más información, puede consultar nuestra{" "}
                                        <Link href="/privacy-policy" className="font-bold text-resolution-blue" target="_blank">
                                            política de privacidad.
                                        </Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                        <div className="flex flex-col gap-4 mt-4 mx-5">
                            <label className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer transition">
                                <input
                                    type="checkbox"
                                    name="privacy_with_ads"
                                    className="mr-4 accent-resolution-blue w-5 h-5"
                                    onChange={(e) => handlePrivacyChoice(e.target.checked, "ads")}
                                />
                                <span className="text-sm text-gris-antracita">
                                    He leído y acepto la política de privacidad de <span className="font-semibold">HELLO FLAT MATE, S.L.</span>, así
                                    como el envío de publicidad.
                                </span>
                            </label>
                            <label className="flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer transition">
                                <input
                                    type="checkbox"
                                    name="privacy_without_ads"
                                    className="mr-4 accent-resolution-blue w-5 h-5"
                                    onChange={(e) => handlePrivacyChoice(e.target.checked, "no_ads")}
                                />
                                <span className="text-sm text-gris-antracita">
                                    He leído y acepto la política de privacidad de <span className="font-semibold">HELLO FLAT MATE, S.L.</span>, pero
                                    no estoy interesado en recibir publicidad.
                                </span>
                            </label>
                        </div>

                        <div className={`  bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}>
                            <button
                                type="button"
                                className={`font-normal ${
                                    isButtonEnabled ? "bg-resolution-blue hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                                } w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    isButtonEnabled ? "focus:ring-blue-500" : ""
                                } sm:ml-3 sm:w-auto sm:text-sm`}
                                onClick={isButtonEnabled ? handleAccept : undefined}
                                disabled={!isButtonEnabled}
                            >
                                Estoy de acuerdo
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
