"use client";
import { useState, useEffect } from "react";

// import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
// import CategoryCard from "./auxiliarComponents/CategoryCard";
// import Select from "./auxiliarComponents/Select";
// import { useRouter } from "next/navigation";
// import DatePickerCategorySelector from "./DatePickerCategoySelector";
import {
  ArrowDownLeftIcon,
  ArrowLeftCircleIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Select from "../../user/home/categorySelector/auxiliarComponents/Select";
import DatePickerCategorySelector from "../../user/home/categorySelector/DatePickerCategoySelector";
import CategoryCard from "../../user/home/categorySelector/auxiliarComponents/CategoryCard";

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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const SecondaryCategorySelector = ({
  helloRoomProperties,
  helloColivingProperties,
  helloStudioProperties,
  helloLandlordProperties,
  allProperties,
}) => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const categoryQuery = searchParams.get("c");

  const [currentCategory, setCurrentCategory] = useState(null);
  const [data, setData] = useState({});
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [numberOccupants, setNumberOccupants] = useState();

  // useEffect(() => {
  //   if (categoryQuery) {
  //     setCurrentCategory(categoryQuery);
  //   }
  // }, [categoryQuery]);

  const extractLocations = (properties) => {
    if (properties.length === 0) {
      return ["Sin opciones disponibles"];
    }
    const uniqueZones = [
      ...new Set(properties.map((property) => property.zone)),
    ];
    return uniqueZones.length > 0 ? uniqueZones : ["Sin opciones disponibles"];
  };

  // Construir la cadena de query string para los parámetros de búsqueda
  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (data.zone) {
      params.append("zone", data.zone);
    }

    if (data.rentalPeriod) {
      params.append("rentalPeriod", data.rentalPeriod);
    }

    if (date.startDate) {
      params.append("startDate", date.startDate);
    }

    if (date.endDate) {
      params.append("endDate", date.endDate);
    }

    if (data.type) {
      params.append("type", data.type);
    }

    if (currentCategory) {
      params.append("category", currentCategory);
    }

    if (numberOccupants) {
      params.append("numberOccupants", numberOccupants.numberOccupants);
    }

    return params.toString();
  };

  const getRentalPeriods = (propiedades) => {
    const fechasUnicas = new Set();

    propiedades.forEach((propiedad) => {
      // Verificar si la propiedad es de tipo HELLO_ROOM o HELLO_COLIVING
      if (
        propiedad.category === "HELLO_ROOM" ||
        propiedad.category === "HELLO_COLIVING" ||
        propiedad.category === "HELLO_LANDLORD"
      ) {
        // Acceder al array rooms y mapear sobre él
        propiedad.rooms.forEach((room) => {
          // Acceder a rentalPeriods y formatear las fechas
          room.rentalItems?.forEach((periodo) => {
            const startDate = new Date(periodo.rentalPeriod?.startDate);
            const endDate = new Date(periodo.rentalPeriod?.endDate);

            // Formatear las fechas en el formato "Del dd/mm/aa al dd/mm/aa"
            const formattedStartDate = `${startDate
              .getDate()
              .toString()
              .padStart(2, "0")}/${(startDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${startDate
              .getFullYear()
              .toString()
              .slice(-2)}`;

            const formattedEndDate = `${endDate
              .getDate()
              .toString()
              .padStart(2, "0")}/${(endDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${endDate.getFullYear().toString().slice(-2)}`;

            const fecha = `Del ${formattedStartDate} al ${formattedEndDate}`;
            // Añadir la fecha al Set para evitar duplicados
            fechasUnicas.add(fecha);
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
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const renderSelectedCategoryContent = () => {
    switch (currentCategory) {
      case "HELLO_ROOM":
        const helloRoomLocations = extractLocations(helloRoomProperties);
        const helloRoomRentalPeriods = getRentalPeriods(helloRoomProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
              <Select
                options={helloRoomLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <Select
                options={helloRoomRentalPeriods}
                data={data}
                setData={setData}
                title="Selecciona un periodo"
                name="rentalPeriod"
              />
              <Select
                options={genre}
                data={data}
                setData={setData}
                title="Tipo de alojamiento"
                name="type"
              />
              <button
                onClick={handleSearch}
                className="p-4 bg-[#1FAECC] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-black"
              >
                Buscar alojamiento
                <MagnifyingGlassIcon className="size-6 text-black" />
              </button>
              {/* <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              /> */}
            </div>
          </div>
        );
      case "HELLO_COLIVING":
        const helloColivingLocations = extractLocations(
          helloColivingProperties
        );
        const helloColivingRentalPeriods = getRentalPeriods(
          helloColivingProperties
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
              <Select
                options={helloColivingLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <Select
                options={helloColivingRentalPeriods}
                data={data}
                setData={setData}
                title="Selecciona un periodo"
                name="rentalPeriod"
              />
              <Select
                options={genre}
                data={data}
                setData={setData}
                title="Tipo de alojamiento"
                name="type"
              />
              <button
                onClick={handleSearch}
                className="p-4 bg-[#1FAECC] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-black"
              >
                Buscar alojamiento
                <MagnifyingGlassIcon className="size-6 text-black" />
              </button>
              {/* <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              /> */}
            </div>
          </div>
        );
      case "HELLO_STUDIO":
        const helloStudioLocations = extractLocations(helloStudioProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
              <Select
                options={helloStudioLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <DatePickerCategorySelector
                data={date}
                setData={setDate}
                type={"start"}
              />
              <DatePickerCategorySelector
                data={date}
                setData={setDate}
                type={"end"}
              />
              <Select
                options={numbers}
                data={numberOccupants}
                setData={setNumberOccupants}
                title="Huespedes"
                name="numberOccupants"
              />
              <button
                onClick={handleSearch}
                className="p-4 bg-[#1FAECC] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-black"
              >
                Buscar alojamiento
                <MagnifyingGlassIcon className="size-6 text-black" />
              </button>
            </div>
          </div>
        );
      case "HELLO_LANDLORD":
        const helloLandlordLocations = extractLocations(
          helloLandlordProperties
        );
        const helloLandlordRentalPeriods = getRentalPeriods(
          helloLandlordProperties
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-col sm:flex-row justify-center items-center sm:flex-wrap sm:justify-items-stretch sm:items-start gap-4">
              <Select
                options={helloLandlordLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <Select
                options={helloLandlordRentalPeriods}
                data={data}
                setData={setData}
                title="Selecciona un periodo"
                name="rentalPeriod"
              />
              <Select
                options={genre}
                data={data}
                setData={setData}
                title="Tipo de alojamiento"
                name="type"
              />
              <button
                onClick={handleSearch}
                className="p-4 bg-[#1FAECC] rounded-md font-bold min-w-72 flex justify-center items-center gap-2 my-2 text-black"
              >
                Buscar alojamiento
                <MagnifyingGlassIcon className="size-6 text-black" />
              </button>
              {/* <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              /> */}
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
      className={`  w-full flex flex-col gap-20 p-4`}
    >
      <div className="w-full flex flex-row justify-between items-center gap-2 p-5">
        {/* <div
          onClick={() => router.push("/")}
          type="button"
          className="self-start flex justify-between min-w-20 items-center gap-2 cursor-pointer"
        >
          <Image
            src={"/payment/back-icon.svg"}
            width={32}
            height={32}
            alt="Boton para regresar"
          />
          <div className="p-0.5 rounded-full hover:bg-black transition duration-300">
            <ChevronLeftIcon className="size-8 font-bold hover:text-white transition duration-300" />
          </div>
          <span className="text-sm underline underline-offset-2 font-bold">
            Volver
          </span>
        </div> */}
        <h1 className="w-full text-center font-bold sm:text-lg">
          ¿Qué deseas reservar?
        </h1>
        {/* <button
          onClick={() => router.push("/")}
          type="button"
          className="self-start flex justify-center min-w-20 items-center gap-2"
        >
          <XMarkIcon className="size-8" />
        </button> */}
      </div>

      {/* Cards de categorías */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 items-center justify-center">
        {list.map((e) => (
          <CategoryCard
            key={e.id}
            title={e.name}
            image={e.img}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            categoryId={e.id}
            onClick={() => setCurrentCategory(e.id)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center items-start">
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
        </div>
      </div>
    </motion.section>
  );
};

export default SecondaryCategorySelector;
