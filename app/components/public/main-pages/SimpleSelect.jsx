import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const SimpleSelect = ({ options, title = "Seleccionar una opción", initValue, categoryy }) => {
    const [showInput, setShowInput] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initValue || title);
    const router = useRouter();

    // Efecto para actualizar el selectedValue cuando cambie initValue
    useEffect(() => {
        setSelectedValue(initValue || title);
    }, [initValue, title]);

    const handleClick = () => {
        setShowInput(!showInput);
    };

    const handleValueChange = (option) => {
        setShowInput(false);
        setSelectedValue(option); // Actualiza el valor seleccionado

        // Redirige según la opción seleccionada
        switch (option) {
            case "helloroom":
                router.push(`/helloroom?category=HELLO_ROOM`);
                break;
            case "hellocoliving":
                router.push(`/hellocoliving?category=HELLO_COLIVING`);
                break;
            case "hellostudio":
                router.push(`/hellostudio?category=HELLO_STUDIO`);
                break;
            case "hellolandlord":
                router.push(`/hellolandlord?category=HELLO_LANDLORD`);
                break;
            case "lastrooms":
                router.push("/lastrooms");
                break;
            case "todos":
                router.push(`/pages/user/filtered`);
                break;
            default:
                break;
        }
    };

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
                            .filter((option) => option)
                            .map((option, index) => (
                                <div
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
                                    onClick={() => handleValueChange(option)}
                                >
                                    <div
                                        className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center ${
                                            selectedValue === option ? "bg-blue-500 border-blue-500" : "border-gray-400"
                                        }`}
                                    >
                                        {selectedValue === option && <CheckIcon className="w-3 h-3 text-white" />}
                                    </div>
                                    {option === "ONLY_WOMEN" ? "Solo chicas" : option === "MIXED" ? "Mixto" : option}
                                </div>
                            ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SimpleSelect;
