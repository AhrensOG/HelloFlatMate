import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar si ya se aceptaron o rechazaron las cookies
        const cookiesResponse = localStorage.getItem("cookiesAccepted");
        if (!cookiesResponse) {
            setIsVisible(true); // Mostrar modal si no hay respuesta
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setIsVisible(false); // Ocultar el modal
    };

    const handleDeny = () => {
        localStorage.setItem("cookiesAccepted", "false");
        setIsVisible(false); // Ocultar el modal
    };

    if (!isVisible) return null;

    return (
        <div className="fixed flex justify-center items-center bottom-0 left-0 right-0 z-50 bg-gray-100 p-4 shadow-lg">
            <div className="relative mx-auto p-6 text-center w-full max-w-screen-xl">
                {/* Botón de cerrar */}
                {/* <button onClick={() => setIsVisible(false)} className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition">
                    ✕
                </button> */}

                {/* Título */}
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Usamos cookies</h2>

                {/* Texto */}
                <p className="text-sm text-gray-600 mb-4">
                    Utilizamos cookies propias y de terceros para analizar la navegación de los usuarios y mejorar nuestros servicios. Al pulsar{" "}
                    <strong>Aceptar</strong>, consiente el uso de estas cookies. Puede obtener más información pulsando en{" "}
                    <Link href="/cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Más información
                    </Link>
                    .
                </p>

                {/* Botones */}
                <div className="flex justify-center gap-4">
                    <button onClick={handleAccept} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Aceptar
                    </button>
                    <button onClick={handleDeny} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                        Denegar
                    </button>
                </div>
            </div>
        </div>
    );
}
