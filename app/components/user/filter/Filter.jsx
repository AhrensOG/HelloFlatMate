import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import Image from "next/image";
import FilterSection from "./filter_section/FilterSection";
import RoomCounter from "./filter_section/RoomCounter";
import PriceRange from "./filter_section/PriceRange";
import DateRangeFilter from "./filter_section/DateRangeFilter"; // Importar el nuevo componente
import { MapPinIcon } from "@heroicons/react/24/outline";
import FilterSelect from "./FilterSelect";

export default function Filter({ isOpen, setOpen, filters, setFilters, onApplyFilters, onFilterChange, category, rentalPeriods, zones }) {
    const handleFilterChange = (filterName, selectedValues) => {
        onFilterChange(filterName, selectedValues);
    };

    const handleSeeResults = () => {
        onApplyFilters();
        setOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    const typeProperty = ["helloroom", "hellocoliving", "hellostudio", "hellolandlord", "lastrooms", "todos los alojamientos"];

    const comoditis = ["Wifi", "Cocina", "Lavadero", "Piscina", "Amueblado", "Jardin"];

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.aside
                    initial={{ opacity: 0, x: 500 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 500 }}
                    transition={{ duration: 0.8 }}
                    className={`  flex flex-col gap-3 w-full h-full overflow-hidden self-end fixed bg-white bottom-0 z-50 py-4`}
                >
                    <div className="h-[5vh] w-full flex items-center px-4">
                        <span>
                            <Image
                                src={"/btn-close.svg"}
                                alt="Close button"
                                layout="responsive"
                                width={24}
                                height={24}
                                onClick={() => setOpen(false)}
                            />
                        </span>
                        <h2 className="text-center grow text-lg font-bold">Filter</h2>
                    </div>
                    <div className="flex items-center justify-between px-4">
                        <button onClick={handleClearFilters} className="w-[45%] py-2 bg-[#CFD5E0] text-[0.9rem] font-bold text-[#1C1C21] rounded-md">
                            Borrar Filtros
                        </button>
                        <button onClick={handleSeeResults} className="w-[45%] py-2 bg-[#4C8BF5] text-white text-[0.9rem] font-bold rounded-md">
                            Aplicar
                        </button>
                    </div>
                    <div className="overflow-auto space-y-4">
                        <PriceRange onChange={handleFilterChange} minValue={filters.minPrice || 0} maxValue={filters.maxPrice || 1000000} />
                        <section className="flex flex-col gap-3 px-4 justify-between">
                            <h2 className="text-base font-bold text-[#1C1C21]">Ubicación y fechas disponibles</h2>
                            {/* <div className="flex justify-between items-center h-[5vh] bg-[#F5F5F5] rounded-[0.6rem] border-[1px] border-[#00000033] outline-none focus:text-[#1C1C21] focus:pl-3">
                <label hidden htmlFor="location">
                  location
                </label>
                <input
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full h-full px-2 appearance-none outline-none rounded-[0.6rem] text-[0.93rem] font-medium"
                  placeholder="Ubicacion"
                  type="text"
                  name="location"
                  id="location"
                  value={filters.location || ""}
                />
                <span className="h-8 w-8">
                  <MapPinIcon />
                </span>
              </div> */}
                            <FilterSelect name="location" options={zones} data={filters} setData={setFilters} title="Zonas" />
                            {category === "HELLO_STUDIO" || (filters.categorys?.length === 1 && filters.categorys[0] === "hellostudio") ? (
                                <DateRangeFilter onChange={handleFilterChange} startDate={filters.startDate} endDate={filters.endDate} />
                            ) : (
                                <FilterSelect
                                    name="rentalPeriod"
                                    options={rentalPeriods}
                                    data={filters}
                                    setData={setFilters}
                                    title="Seleccionar un período"
                                />
                            )}
                        </section>

                        {/* <FilterSection
              onChange={handleFilterChange}
              title={"Comodidades"}
              entries={comoditis}
              initialValues={filters.comodities || []}
            />
            <RoomCounter
              onChange={handleFilterChange}
              initialValue={filters.rooms || 1}
            /> */}
                        <FilterSection
                            onChange={handleFilterChange}
                            title={"Tipo de Propiedad"}
                            entries={typeProperty}
                            initialValues={filters.categorys || []}
                        />
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
