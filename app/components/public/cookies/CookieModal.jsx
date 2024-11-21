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

    const handleClose = () => {
        setIsVisible(false); // Solo cierra el modal, no guarda nada
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-100 shadow-lg p-6 text-center">
            <div className="relative w-full p-6 text-center">
                {/* Botón de cerrar */}
                <button onClick={handleClose} className="absolute top-1 right-1 text-gray-500 hover:text-gray-800 transition">
                    ✕
                </button>

                {/* Título y texto */}
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Usamos cookies</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra{" "}
                    <a href="/politica-cookies" className="text-blue-600 hover:underline">
                        política de cookies
                    </a>
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
