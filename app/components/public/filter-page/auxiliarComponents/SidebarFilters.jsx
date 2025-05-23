"use client";
import React from "react";

const SidebarFilters = ({
  filters,
  setFilters,
  localPrice,
  setLocalPrice,
  zones,
  loadingZones,
  rentalPeriods,
  loadingPeriods,
  categoryOptions,
  allCategoryValues,
}) => {
  return (
    <>
      {/* Filtro: Periodo */}
      <div>
        {loadingPeriods ? (
          <p>Cargando periodos...</p>
        ) : (
          <select
            className="mb-4 w-full p-2 border rounded"
            value={filters.rentalPeriod || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                rentalPeriod: e.target.value || null,
              }))
            }>
            <option value="">Todos los periodos</option>
            {rentalPeriods?.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Filtro: Zona */}
      <div>
        {loadingZones ? (
          <p>Cargando zonas...</p>
        ) : (
          <select
            className="mb-4 w-full p-2 border rounded"
            value={filters.zone?.[0] || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                zone: e.target.value ? [e.target.value] : [],
              }))
            }>
            <option value="">Todas las zonas</option>
            {zones?.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Filtro: Price */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Rango de precios (€)
        </label>

        {/* Contenedor del slider */}
        <div className="relative h-6">
          {/* Barra de fondo */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-300 rounded" />

          {/* Barra del rango activo */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-blue-500 rounded"
            style={{
              left: `${((filters.minPrice ?? 100) - 100) / 9}%`,
              right: `${100 - ((filters.maxPrice ?? 1000) - 100) / 9}%`,
            }}
          />

          {/* Slider mínimo */}
          <input
            type="range"
            min={100}
            max={1000}
            step={10}
            value={localPrice.min}
            onChange={(e) =>
              setLocalPrice((prev) => ({
                ...prev,
                min: Math.min(Number(e.target.value), localPrice.max),
              }))
            }
            className="absolute top-2 w-full h-2 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
          />

          {/* Slider máximo */}
          <input
            type="range"
            min={100}
            max={1000}
            step={10}
            value={localPrice.max}
            onChange={(e) =>
              setLocalPrice((prev) => ({
                ...prev,
                max: Math.max(Number(e.target.value), localPrice.min),
              }))
            }
            className="absolute top-2 w-full h-2 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
          />
        </div>

        {/* Mostrar valores */}
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>€{filters.minPrice ?? 100}</span>
          <span>€{filters.maxPrice ?? 1000}</span>
        </div>
      </div>

      {/* Filtro: Categorías */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Categorías</label>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {/* Opción: todas */}
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                filters.category.length === 0 ||
                filters.category.length === allCategoryValues.length
              }
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  category: e.target.checked ? [] : allCategoryValues,
                }))
              }
            />
            <span>Todas las categorías</span>
          </label>

          {/* Otras opciones */}
          {categoryOptions.map(({ label, value }) => (
            <label key={value} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.category.includes(value)}
                onChange={(e) => {
                  setFilters((prev) => {
                    const current = prev.category;
                    const next = e.target.checked
                      ? [...current, value]
                      : current.filter((c) => c !== value);
                    return {
                      ...prev,
                      category: next,
                    };
                  });
                }}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro: Typology */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tipología</label>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="typology"
              value="all"
              checked={filters.typology === null}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  typology: null,
                }))
              }
            />
            <span>Mostrar todos</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="typology"
              value="ONLY_WOMEN"
              checked={filters.typology === "ONLY_WOMEN"}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  typology: "ONLY_WOMEN",
                }))
              }
            />
            <span>Solo chicas</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="typology"
              value="ONLY_MAN"
              checked={filters.typology === "ONLY_MAN"}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  typology: "ONLY_MAN",
                }))
              }
            />
            <span>Solo chicos</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="typology"
              value="MIXED"
              checked={filters.typology === "MIXED"}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  typology: "MIXED",
                }))
              }
            />
            <span>Mixto</span>
          </label>
        </div>
      </div>

      {/* Filtro: Couple */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Apto para parejas
        </label>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="couple"
              value="all"
              checked={filters.couple === null}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  couple: null,
                }))
              }
            />
            <span>Mostrar todos</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="couple"
              value="true"
              checked={filters.couple === true}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  couple: true,
                }))
              }
            />
            <span>Solo aptos para pareja</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="couple"
              value="false"
              checked={filters.couple === false}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  couple: false,
                }))
              }
            />
            <span>Solo no aptos para pareja</span>
          </label>
        </div>
      </div>

      {/* Filtro: Bathroom */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Baño privado</label>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="bathroom"
              value="all"
              checked={filters.bathroom === null}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  bathroom: null,
                }))
              }
            />
            <span>Mostrar todos</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="bathroom"
              value="true"
              checked={filters.bathroom === true}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  bathroom: true,
                }))
              }
            />
            <span>Solo con baño privado</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="bathroom"
              value="false"
              checked={filters.bathroom === false}
              onChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  bathroom: false,
                }))
              }
            />
            <span>Solo sin baño privado</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
