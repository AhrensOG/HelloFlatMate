"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  const getErrorMessage = () => {
    switch (error?.statusCode) {
      case 404:
        return {
          title: "Página no encontrada",
          message: "Lo sentimos, no podemos encontrar la página que buscas.",
          image: "/_error/404.svg",
        };
      case 500:
        return {
          title: "Error en el servidor",
          message:
            "Ocurrió un problema en nuestro servidor. Estamos trabajando para solucionarlo.",
          image: "/_error/500.svg",
        };
      default:
        return {
          title: "Error",
          message:
            "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
          image: "/_error/generic.svg",
        };
    }
  };

  const { title, message, image } = getErrorMessage();

  // Este efecto se ejecuta al cambiar el estado de error
  useEffect(() => {
    console.error("Error capturado:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4 py-8">
          {/* Imagen de error */}
          <div className="mb-8">
            <Image src={image} alt="Error Image" width={400} height={300} />
          </div>

          {/* Título del error */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>

          {/* Mensaje descriptivo */}
          <p className="text-lg text-gray-600 mb-6">{message}</p>

          {/* Botón para regresar a la página principal */}
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          >
            Volver al Inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
