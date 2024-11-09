import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4 py-8">
      {/* Imagen de error */}
      <div className="mb-8">
        <Image
          src={"/_error/404.svg"}
          alt="Error Image"
          width={400}
          height={300}
        />
      </div>

      {/* Título del error */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Página no encontrada
      </h1>

      {/* Mensaje descriptivo */}
      <p className="text-lg text-gray-600 mb-6">
        Lo sentimos, no podemos encontrar la página que buscas.
      </p>

      {/* Botón para regresar a la página principal */}
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
