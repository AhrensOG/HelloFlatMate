import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import countries from "world-countries";

const countryList = countries
  .map((country) => ({
    code: country.cca2.toLowerCase(),
    name: country.translations.spa.common, // Nombre completo en español
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const CountrySelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Controla el estado del menú
  const [selectedValue, setSelectedValue] = useState(value || ""); // Valor seleccionado
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda

  // Filtrar la lista de países según el término de búsqueda
  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (name) => {
    setSelectedValue(name); // Establece el valor seleccionado
    onChange(name); // Notifica al padre
    setIsOpen(false); // Cierra el menú
  };

  return (
    <div className="relative w-full">
      {/* Campo de selección */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border rounded-md px-3 py-2 bg-white ${isOpen && "ring-1 ring-blue-300"} outline-none cursor-pointer flex justify-between items-center`}
      >
        <span className="text-gray-700 text-base">
          {selectedValue || "Selecciona tu nacionalidad"}
        </span>
      </div>

      {/* Menú desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bg-white border rounded-md mt-1 w-full shadow-lg overflow-hidden drop-shadow-md"
          >
            {/* Campo de búsqueda */}
            <div className="border-b px-3 py-2">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-300 outline-none"
              />
            </div>

            {/* Lista filtrada */}
            <motion.ul className="max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {filteredCountries.map((country) => (
                <motion.li
                  key={country.code}
                  onClick={() => handleSelect(country.name)}
                  className="px-3 py-2 text-base text-start text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {country.name}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelect;
