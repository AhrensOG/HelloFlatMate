import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <article
      className="animate-pulse flex flex-col max-h-96 h-full gap-3 w-full sm:max-w-72 
      cursor-pointer border sm:border-none rounded-sm"
      aria-hidden="true" // Esto indica que el componente es solo visual
    >
      <div className="flex sm:flex-col gap-3 sm:gap-0 w-full h-full">
        {/* Imagen */}
        <div
          className="relative h-28 w-28 sm:w-72 sm:h-60 bg-gray-300 rounded-md"
          aria-hidden="true"
        ></div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 items-stretch p-2 sm:py-4 gap-2">
          <div className="flex flex-col grow sm:gap-2">
            {/* Categoría */}
            <div
              className="h-4 bg-gray-300 rounded w-20"
              aria-hidden="true"
            ></div>

            {/* Nombre */}
            <div
              className="h-5 bg-gray-300 rounded w-3/4"
              aria-hidden="true"
            ></div>

            {/* Ubicación */}
            <div
              className="h-4 bg-gray-300 rounded w-1/2"
              aria-hidden="true"
            ></div>

            {/* Amenidades */}
            <div
              className="h-3 bg-gray-300 rounded w-full"
              aria-hidden="true"
            ></div>
          </div>

          {/* Precio */}
          <div className="flex justify-end items-end gap-2">
            <div
              className="h-5 bg-gray-300 rounded w-1/4"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCardSkeleton;
