"use client";
import { useState, useEffect } from "react";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CategoryCard from "./auxiliarComponents/CategoryCard";
import Select from "./auxiliarComponents/Select";
import { useRouter, useSearchParams } from "next/navigation";
import SelectDate from "./auxiliarComponents/SelectDate";
import SelectDateHelloStudio from "./SelectDateHelloStudio";
import DatePickerCategorySelector from "./DatePickerCategoySelector";

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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CategorySelector = ({
  helloRoomProperties,
  helloColivingProperties,
  helloStudioProperties,
  helloLandlordProperties,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("c");

  const [currentCategory, setCurrentCategory] = useState(null);
  const [data, setData] = useState({});
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [numberOccupants, setNumberOccupants] = useState();

  useEffect(() => {
    if (categoryQuery) {
      setCurrentCategory(categoryQuery);
    }
  }, [categoryQuery]);

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
    console.log(data);

    const params = new URLSearchParams();

    if (data.zone) {
      params.append("zone", data.zone);
    }

    if (date.startDate) {
      params.append("startDate", date.startDate);
    }

    if (date.endDate) {
      params.append("endDate", date.endDate);
    }

    if (currentCategory) {
      params.append("category", currentCategory);
    }

    if (numberOccupants) {
      params.append("numberOccupants", numberOccupants.numberOccupants);
    }

    return params.toString();
  };

  // Función que se llama al hacer clic en el botón "Buscar"
  const handleSearch = () => {
    const queryString = buildQueryString();
    router.push(`/pages/user/filtered?${queryString}`);
  };

  const renderSelectedCategoryContent = () => {
    switch (currentCategory) {
      case "HELLO_ROOM":
        const helloRoomLocations = extractLocations(helloRoomProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-start items-start gap-4">
              <Select
                options={helloRoomLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              />
            </div>
          </div>
        );
      case "HELLO_COLIVING":
        const helloColivingLocations = extractLocations(
          helloColivingProperties
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-start items-start gap-4">
              <Select
                options={helloColivingLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
                name="zone"
              />
              <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              />
            </div>
          </div>
        );
      case "HELLO_STUDIO":
        const helloStudioLocations = extractLocations(helloStudioProperties);
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-start items-start gap-4">
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
            </div>
          </div>
        );
      case "HELLO_LANDLORD":
        const helloLandlordLocations = extractLocations(
          helloLandlordProperties
        );
        return (
          <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-screen-lg flex flex-wrap justify-start items-start gap-4">
              <Select
                options={helloLandlordLocations}
                data={data}
                setData={setData}
                title="¿En qué zona?"
              />
              <SelectDate
                title="Seleccione un rango de fechas"
                data={date}
                setData={setDate}
              />
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
      className={`${plus_jakarta.className} w-full flex flex-col gap-5 p-4`}
    >
      <div className="w-full flex flex-row justify-start items-center gap-2 p-5">
        <button
          onClick={() => router.push("/")}
          type="button"
          className="self-start flex justify-center items-center gap-2"
        >
          <Image
            src={"/payment/back-icon.svg"}
            width={24}
            height={24}
            alt="Boton para regresar"
          />
          <span className="text-sm underline font-medium">Volver</span>
        </button>
        <h1 className="w-[calc(100%_-_170px)] text-center font-bold sm:text-lg">
          ¿Qué deseas reservar?
        </h1>
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

      {currentCategory && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="w-full mt-6 p-4 text-center"
          >
            {renderSelectedCategoryContent()}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-screen-lg flex justify-start items-center">
          <button
            onClick={handleSearch}
            className="px-10 py-4 bg-[#1FAECC] rounded-md text-white font-bold"
          >
            Buscar
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySelector;
