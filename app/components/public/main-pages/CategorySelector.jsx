"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CategoryCard from "../../user/home/categorySelector/auxiliarComponents/CategoryCard";
import Select from "../../user/home/categorySelector/auxiliarComponents/Select";
import DatePickerCategorySelector from "../../user/home/categorySelector/DatePickerCategoySelector";
import SimpleSelect from "./SimpleSelect";

const list = [
    {
        name: "helloroom",
        img: "/create-property/helloroom.svg",
        id: "HELLO_ROOM",
    },
    {
        name: "hellocoliving",
        img: "/create-property/hellocoliving.svg",
        id: "HELLO_COLIVING",
    },
    {
        name: "hellostudio",
        img: "/create-property/hellostudio.svg",
        id: "HELLO_STUDIO",
    },
    {
        name: "hellolandlord",
        img: "/create-property/hellolandlord.svg",
        id: "HELLO_LANDLORD",
    },
];

const genre = ["ONLY_WOMEN", "MIXED"];

const numbers = ["1 huésped", "1 huésped + 1 niño", "2 huéspedes", "2 huéspedes + 1 niño"];

const CategorySelector = ({
    category,
    filters,
    setFilters,
    helloRoomProperties,
    helloColivingProperties,
    helloStudioProperties,
    helloLandlordProperties,
    allProperties,
}) => {
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState(category);
    const [date, setDate] = useState({ startDate: "", endDate: "" });
    const [numberOccupants, setNumberOccupants] = useState();
    const [resetFilters, setResetFilters] = useState();

    useEffect(() => {
        if (category) {
            setCurrentCategory(category);
        }
    }, []);

    const extractLocations = (properties) => {
        if (properties.length === 0) {
            return ["Sin opciones disponibles"];
        }
        const uniqueZones = [...new Set(properties.map((property) => property.zone))];
        return uniqueZones.length > 0 ? uniqueZones : ["Sin opciones disponibles"];
    };

    // Construir la cadena de query string para los parámetros de búsqueda
    const buildQueryString = (category = currentCategory) => {
        const params = new URLSearchParams();

        if (filters.zone) {
            params.append("zone", filters.zone);
        }

        if (filters.rentalPeriod) {
            params.append("rentalPeriod", filters.rentalPeriod);
        }

        if (date.startDate) {
            params.append("startDate", date.startDate);
        }

        if (date.endDate) {
            params.append("endDate", date.endDate);
        }

        if (filters.type) {
            params.append("type", filters.type);
        }

        if (currentCategory) {
            params.append("category", category || currentCategory);
        }

        if (numberOccupants) {
            params.append("numberOccupants", numberOccupants.numberOccupants);
        }

        return params.toString();
    };

    const getRentalPeriods = (propiedades) => {
        const fechasUnicas = new Set();
        const fechaActual = new Date(); // Obtener la fecha actual

        propiedades.forEach((propiedad) => {
            // Verificar si la propiedad es de tipo HELLO_ROOM, HELLO_COLIVING o HELLO_LANDLORD
            if (propiedad.category === "HELLO_ROOM" || propiedad.category === "HELLO_COLIVING" || propiedad.category === "HELLO_LANDLORD") {
                // Acceder al array rooms y mapear sobre él
                propiedad.rooms.forEach((room) => {
                    // Acceder a rentalPeriods y formatear las fechas
                    room.rentalItems?.forEach((periodo) => {
                        const startDate = new Date(periodo.rentalPeriod?.startDate);
                        const endDate = new Date(periodo.rentalPeriod?.endDate);

                        // Verificar si la startDate es superior a la fecha actual
                        if (startDate > fechaActual) {
                            // Formatear las fechas en el formato "Del dd/mm/aa al dd/mm/aa"
                            const formattedStartDate = `${startDate.getDate().toString().padStart(2, "0")}/${(startDate.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}/${startDate.getFullYear().toString().slice(-2)}`;
                            const formattedEndDate = `${endDate.getDate().toString().padStart(2, "0")}/${(endDate.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}/${endDate.getFullYear().toString().slice(-2)}`;

                            const fecha = `Del ${formattedStartDate} al ${formattedEndDate}`;
                            // Añadir la fecha al Set para evitar duplicados
                            fechasUnicas.add(fecha);
                        }
                    });
                });
            }
        });

        // Convertir el Set a un array para devolverlo
        return Array.from(fechasUnicas);
    };

    // Función que se llama al hacer clic en el botón "Buscar"
    const handleSearch = () => {
        const queryString = buildQueryString();
        const url = `${window.location.origin}/pages/user/filtered?${queryString}`;

        // Abrir en una nueva pestaña
        // window.open(url, "_blank", "noopener,noreferrer");
    };

    const cleanFilters = () => {
        setFilters({
            category: category,
            zone: null,
            rentalPeriod: null,
            startDate: null,
            endDate: null,
            type: null,
            numberOccupants: null,
        }); // Restablecer los filtros a un objeto vacío
        setDate({ startDate: "", endDate: "" }); // Limpiar las fechas
        setNumberOccupants(null); // Restablecer el número de ocupantes
        setResetFilters(true); // Indica que los selectores deben reiniciar sus valores
        setTimeout(() => setResetFilters(false), 0); // Vuelve a desactivar después de un ciclo
    };

    const renderSelectedCategoryContent = () => {
        const typeArray = ["HELLO_ROOM", "HELLO_STUDIO", "HELLO_COLIVING", "HELLO_LANDLORD", "lastrooms", "todos"]
            .filter((cat) => cat !== category)
            .map((cat) => cat.toLowerCase().replace(/_/g, ""));

        switch (currentCategory) {
            case "HELLO_ROOM":
                const helloRoomLocations = extractLocations(helloRoomProperties);
                const helloRoomRentalPeriods = getRentalPeriods(helloRoomProperties);

                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
                            <SimpleSelect options={typeArray} title="Tipo alojamiento" initValue={"helloroom"} categoryy={"HELLO_ROOM"} />
                            <Select
                                resetFilters={resetFilters}
                                options={helloRoomLocations}
                                data={filters}
                                setData={setFilters}
                                title="Zona"
                                name="zone"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={helloRoomRentalPeriods}
                                data={filters}
                                setData={setFilters}
                                title="Fechas"
                                name="rentalPeriod"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={genre}
                                data={filters}
                                setData={setFilters}
                                title="Comparte con"
                                name="type"
                            />
                            <button
                                onClick={handleSearch}
                                className="p-4 bg-[#5ce0e5] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-white"
                            >
                                Buscar alojamiento
                                <MagnifyingGlassIcon className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                );
            case "HELLO_COLIVING":
                const helloColivingLocations = extractLocations(helloColivingProperties);
                const helloColivingRentalPeriods = getRentalPeriods(helloColivingProperties);
                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
                            <SimpleSelect options={typeArray} title="Tipo alojamiento" initValue={"hellocoliving"} categoryy={"HELLO_COLIVING"} />
                            <Select
                                resetFilters={resetFilters}
                                options={helloColivingLocations}
                                data={filters}
                                setData={setFilters}
                                title="Zona"
                                name="zone"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={helloColivingRentalPeriods}
                                data={filters}
                                setData={setFilters}
                                title="Fechas"
                                name="rentalPeriod"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={genre}
                                data={filters}
                                setData={setFilters}
                                title="Comparte con"
                                name="type"
                            />
                            <button
                                onClick={handleSearch}
                                className="p-4 bg-[#5ce0e5] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-white"
                            >
                                Buscar alojamiento
                                <MagnifyingGlassIcon className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                );
            case "HELLO_STUDIO":
                const helloStudioLocations = extractLocations(helloStudioProperties);
                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
                            <SimpleSelect options={typeArray} title="Tipo alojamiento" initValue={"hellostudio"} categoryy={"HELLO_STUDIO"} />
                            <Select
                                resetFilters={resetFilters}
                                options={helloStudioLocations}
                                data={filters}
                                setData={setFilters}
                                title="Zona"
                                name="zone"
                            />
                            <DatePickerCategorySelector data={date} setData={setDate} type={"start"} />
                            <DatePickerCategorySelector data={date} setData={setDate} type={"end"} />
                            <Select
                                resetFilters={resetFilters}
                                options={numbers}
                                data={filters}
                                setData={setFilters}
                                title="Huespedes"
                                name="numberOccupants"
                            />
                            <button
                                onClick={handleSearch}
                                className="p-4 bg-[#5ce0e5] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-white"
                            >
                                Buscar alojamiento
                                <MagnifyingGlassIcon className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                );
            case "HELLO_LANDLORD":
                const helloLandlordLocations = extractLocations(helloLandlordProperties);
                const helloLandlordRentalPeriods = getRentalPeriods(helloLandlordProperties);
                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
                            <SimpleSelect options={typeArray} title="Tipo alojamiento" initValue={"hellolandlord"} categoryy={"HELLO_LANDLORD"} />
                            <Select resetFilters={resetFilters} options={helloLandlordLocations} data={filters} setData={setFilters} title="Zona" name="zone" />
                            <Select
                                resetFilters={resetFilters}
                                options={helloLandlordRentalPeriods}
                                data={filters}
                                setData={setFilters}
                                title="Fechas"
                                name="rentalPeriod"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={genre}
                                data={filters}
                                setData={setFilters}
                                title="Comparte con"
                                name="type"
                            />
                            <button
                                onClick={handleSearch}
                                className="p-4 bg-[#5ce0e5] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-white"
                            >
                                Buscar alojamiento
                                <MagnifyingGlassIcon className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                );
            case "lastroom":
                const lastroomLocations = extractLocations(allProperties);
                const lastroomRentalPeriods = getRentalPeriods(allProperties);
                return (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
                            <SimpleSelect options={typeArray} title="Tipo alojamiento" initValue={"lastroom"} categoryy={"lastroom"} />
                            <Select
                                resetFilters={resetFilters}
                                options={lastroomLocations}
                                data={filters}
                                setData={setFilters}
                                title="¿En qué zona?"
                                name="zone"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={lastroomRentalPeriods}
                                data={filters}
                                setData={setFilters}
                                title="Selecciona un periodo"
                                name="rentalPeriod"
                            />
                            <Select
                                resetFilters={resetFilters}
                                options={genre}
                                data={filters}
                                setData={setFilters}
                                title="Comparte con"
                                name="type"
                            />
                            <button
                                onClick={handleSearch}
                                className="p-4 bg-[#5ce0e5] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-white"
                            >
                                Buscar alojamiento
                                <MagnifyingGlassIcon className="size-6 text-white" />
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`  w-full flex flex-col gap-6 p-4 z-20`}
        >
            <div className="w-full flex flex-col justify-center items-center">
                <div
                    className={`max-w-screen-xl w-full flex flex-col sm:flex-row ${
                        currentCategory ? "justify-between" : "justify-end"
                    } items-center sm:items-start p-4`}
                >
                    {currentCategory && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ duration: 0.25 }}
                                className="w-full text-center"
                            >
                                {renderSelectedCategoryContent()}
                            </motion.div>
                        </AnimatePresence>
                    )}
                    <div className="flex justify-start items-center"></div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <button onClick={() => cleanFilters()} className="text-sm underline">
                        Reiniciar filtros
                    </button>
                </div>
            </div>
        </motion.section>
    );
};

export default CategorySelector;
