import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon, CheckIcon } from "@heroicons/react/24/outline";

const Select = ({ name = false, options, data, setData, title = "Seleccionar una opción", resetFilters = false }) => {
    const [showInput, setShowInput] = useState(false);
    const [selectedValue, setSelectedValue] = useState(title);

    console.log(data);

    if (name === "numberOccupants") {
        const optionNumberValue = options.map((option) => {
            return {
                label: option,
                value: option.split("+").reduce((acc, num) => acc + parseInt(num), 0),
            };
        });

        options = optionNumberValue;
    }

    // Efecto para establecer el valor seleccionado inicial basado en data
    useEffect(() => {
        if (data[name] !== null && data[name] !== undefined) {
            setSelectedValue(data[name]); // Establece el valor de selectedValue basado en filters
        } else {
            setSelectedValue(title); // Si no hay valor en data, usa el título por defecto
        }
    }, [name]); // Ejecutar cuando data o name cambian

    const handleClick = () => {
        setShowInput(!showInput);
    };

    const handleValueChange = (option) => {
        if (option) {
            setSelectedValue(option?.label || option);
            setData({ ...data, [name]: option?.value || option });
        }
        setShowInput(false); // Cierra el dropdown después de seleccionar una opción
        console.log(data);
    };

    useEffect(() => {
        if (resetFilters) {
            setSelectedValue(title); // Resetea al valor del título cuando se reinician los filtros
        }
    }, [resetFilters]); // Ejecuta solo cuando resetFilters cambia

    return (
        <section className="w-[18rem] relative">
            <div
                className="rounded-lg flex justify-between p-2 items-center shadow-card-action my-2 py-4 cursor-pointer bg-white border-2"
                onClick={handleClick}
            >
                {selectedValue === "ONLY_WOMEN" ? "Solo chicas" : selectedValue === "MIXED" ? "Mixto" : selectedValue}
                <span
                    className={`flex justify-start items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
                        showInput ? "bg-[#1C8CD65E] rotate-180" : ""
                    }`}
                >
                    <ChevronUpIcon />
                </span>
            </div>
            <AnimatePresence>
                {showInput && (
                    <motion.div
                        className="absolute w-full z-10 flex flex-col shadow-reservation-list bg-white max-h-28 overflow-y-auto scrollbar-thin border-2 rounded-md"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {options
                            .filter((option) => option) // Filtrar las opciones vacías
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                                    onClick={() => handleValueChange(option)}
                                >
                                    {/* Checkbox Visual */}
                                    <div
                                        className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center ${
                                            name === "numberOccupants"
                                                ? selectedValue === option.value
                                                    ? "bg-blue-500 border-blue-500"
                                                    : "border-gray-400"
                                                : selectedValue === option
                                                ? "bg-blue-500 border-blue-500"
                                                : "border-gray-400"
                                        }`}
                                    >
                                        {console.log(selectedValue)}
                                        {name === "numberOccupants"
                                            ? selectedValue?.label === option.label && <CheckIcon className="w-3 h-3 text-white" />
                                            : selectedValue === option && <CheckIcon className="w-3 h-3 text-white" />}
                                    </div>
                                    {option === "ONLY_WOMEN"
                                        ? "Solo chicas"
                                        : option === "MIXED"
                                        ? "Mixto"
                                        : name === "numberOccupants"
                                        ? option.label
                                        : option}
                                </div>
                            ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Select;
