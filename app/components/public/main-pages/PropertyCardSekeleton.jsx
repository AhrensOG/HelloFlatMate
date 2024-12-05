import React from "react";

const PropertyCardSekeleton = () => {
  return (
    <article className="animate-pulse flex flex-col max-h-96 h-full gap-3 w-full sm:max-w-72 cursor-pointer border sm:border-none rounded-sm">
      <div className="flex sm:flex-col gap-3 sm:gap-0 w-full h-full">
        {/* Imagen */}
        <div className="relative h-28 w-28 sm:w-72 sm:h-60 bg-gray-300 rounded-md"></div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 items-stretch p-2 sm:py-4 gap-2">
          <div className="flex flex-col grow sm:gap-2">
            {/* Categoría */}
            <div className="h-4 bg-gray-300 rounded w-20"></div>

            {/* Nombre */}
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>

            {/* Ubicación */}
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>

            {/* Amenidades */}
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Precio */}
          <div className="flex justify-end items-end gap-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCardSekeleton;
