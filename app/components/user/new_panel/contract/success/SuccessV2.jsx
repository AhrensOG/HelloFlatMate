import React from "react";
import Link from "next/link";

const SuccessV2 = () => {
    return (
        <div className="flex items-center justify-center p-4 w-full h-full">
            <div className="w-full p-6 text-center flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-[#440cac] mb-4">
                    ¡Contrato firmado!
                </h1>
                <p className="text-gray-700 mb-4 max-w-md">
                    Gracias por confiar en nosotros. Tu contrato ha sido firmado
                    exitosamente.
                </p>
                <p className="text-gray-600 text-sm mb-8 max-w-md">
                    Nuestro equipo revisará tu contrato y la firma en breve. Si
                    encontramos que falta información o es necesaria alguna
                    corrección, nos pondremos en contacto contigo para ayudarte.
                </p>
                <Link
                    href="/pages/user/reservations"
                    className="inline-block bg-[#440cac] text-white font-semibold py-3 px-6 rounded hover:bg-[#5a1fb8] transition-colors">
                    Ir a reservas
                </Link>
            </div>
        </div>
    );
};

export default SuccessV2;
