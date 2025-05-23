"use client";

import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import NavbarV3 from "../../nav_bar/NavbarV3";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SidebarFilters from "./auxiliarComponents/SidebarFilters";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const FilterPageComponent = () => {
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    category: [],
    typology: null,
    zone: [],
    bathroom: null,
    couple: null,
    rentalPeriod: null,
    order: null,
  });
  const [localPrice, setLocalPrice] = useState({
    min: 100,
    max: 1000,
  });
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        minPrice: localPrice.min,
        maxPrice: localPrice.max,
      }));
    }, 400); // ⏱ solo después de 400ms sin cambios

    return () => clearTimeout(timeout); // limpia el timeout si el usuario sigue arrastrando
  }, [localPrice]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.bathroom !== null)
      params.append("bathroom", filters.bathroom.toString());
    if (filters.couple !== null)
      params.append("couple", filters.couple.toString());
    if (filters.rentalPeriod)
      params.append("rentalPeriod", filters.rentalPeriod);

    if (filters.category.length > 0) {
      params.append("category", filters.category.join(","));
    }

    if (filters.typology) {
      params.append("typology", filters.typology);
    }

    if (filters.zone?.length) {
      params.append("zone", filters.zone.join(","));
    }

    if (filters.order) {
      params.append("order", filters.order);
    }

    return `/api/property/filter-page?${params.toString()}`;
  }, [filters]);

  const {
    data: rooms,
    isLoading,
    error,
  } = useSWR(queryString, fetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: rentalPeriods,
    isLoading: loadingPeriods,
    error: errorPeriods,
  } = useSWR("/api/property/rental-periods", fetcher, {
    revalidateOnFocus: false,
  });

  const {
    data: zones,
    isLoading: loadingZones,
    error: errorZones,
  } = useSWR("/api/property/zones", fetcher, {
    revalidateOnFocus: false,
  });

  const categoryOptions = [
    { label: "helloroom", value: "HELLO_ROOM" },
    { label: "hellostudio", value: "HELLO_STUDIO" },
    { label: "hellolandlord", value: "HELLO_LANDLORD" },
    { label: "hellocoliving", value: "HELLO_COLIVING" },
  ];

  const allCategoryValues = categoryOptions.map((opt) => opt.value);

  return (
    <div className="pt-16 h-screen overflow-hidden">
      <NavbarV3 fixed />

      <div className="flex h-[calc(100vh-64px)]">
        <aside className="hidden md:block w-64 p-4 border-r overflow-y-auto">
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            localPrice={localPrice}
            setLocalPrice={setLocalPrice}
            zones={zones}
            loadingZones={loadingZones}
            rentalPeriods={rentalPeriods}
            loadingPeriods={loadingPeriods}
            categoryOptions={categoryOptions}
            allCategoryValues={allCategoryValues}
          />
        </aside>

        {/* Sidebar mobile (slide in) */}
        <AnimatePresence>
          {showFiltersMobile && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 border-r shadow-md overflow-y-auto md:hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filtros</h2>
                <button
                  onClick={() => setShowFiltersMobile(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl">
                  ✕
                </button>
              </div>

              <SidebarFilters
                filters={filters}
                setFilters={setFilters}
                localPrice={localPrice}
                setLocalPrice={setLocalPrice}
                zones={zones}
                loadingZones={loadingZones}
                rentalPeriods={rentalPeriods}
                loadingPeriods={loadingPeriods}
                categoryOptions={categoryOptions}
                allCategoryValues={allCategoryValues}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto p-4 pt-0 relative mt-28">
          <div className="fixed top-20 pb-2">
            <h1 className="text-xl font-semibold mb-4">
              Todos nuestros alojamientos
            </h1>
            <div className="flex justify-start mb-4 gap-1">
              {/* Botón para móviles */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowFiltersMobile(true)}
                  className="px-3 text-sm py-1 border rounded text-gray-800 bg-white hover:bg-gray-100 md:text-base">
                  Filtros
                </button>
              </div>
              <button
                onClick={() =>
                  setFilters((prev) => {
                    let nextOrder = null;
                    if (prev.order === "price_desc") nextOrder = "price_asc";
                    else if (prev.order === "price_asc") nextOrder = null;
                    else nextOrder = "price_desc";

                    return {
                      ...prev,
                      order: nextOrder,
                    };
                  })
                }
                className="px-3 text-sm py-1 border rounded text-gray-800 bg-white hover:bg-gray-100 md:text-base">
                {filters.order === "price_desc"
                  ? "Orden: Precio mas alto a mas bajo "
                  : filters.order === "price_asc"
                  ? "Orden: Precio mas bajo a mas alto"
                  : "Sin orden"}
              </button>
            </div>
          </div>

          {isLoading && <p>Cargando habitaciones...</p>}
          {error && (
            <p className="text-red-500">Error al obtener habitaciones</p>
          )}
          {!isLoading && rooms?.length === 0 && (
            <p>No se encontraron habitaciones</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {rooms?.map((room) => (
              <Link
                key={room.id}
                href={`/pages/property-details/${room.property?.id}/room-details/${room.id}`}
                target="_blank"
                className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 cursor-pointer">
                <div className="relative w-full h-[220px]">
                  <Image
                    src={room.images?.[0] ?? "/fallback.jpg"}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-fill"
                    quality={60}
                    loading="lazy"
                    placeholder="empty"
                  />
                </div>

                <div className="p-4 flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {room.name}
                  </h2>
                  <p className="text-blue-600 font-bold text-sm">
                    €{room.price} <span>/ mes</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {room.property?.zone} – {room.property?.street}{" "}
                    {room.property?.streetNumber}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FilterPageComponent;
