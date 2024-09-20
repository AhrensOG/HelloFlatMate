import React from "react";

const SkeletonPropertyCard = () => {
  return (
    <div className="relative w-[246px] h-[400px] rounded-lg shadow-lg animate-pulse bg-gray-200">
      {/* Imagen de fondo simulada */}
      <div className="relative w-full h-52 bg-gray-200 rounded-t-lg"></div>

      {/* Contenido de la tarjeta */}
      <div className="absolute bottom-0 left-0 p-4 w-full bg-white min-h-48">
        {/* Título simulado */}
        <div className="h-6 bg-gray-200 rounded-md mb-2"></div>

        {/* Descripción simulada */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded-md"></div>
        </div>

        {/* Botón simulado */}
        <div className="flex justify-center mt-4">
          <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPropertyCard;
