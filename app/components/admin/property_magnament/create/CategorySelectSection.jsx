"use client";
 
import Image from "next/image";
import { motion } from "framer-motion";
import CategoryCard from "./auxiliarComponents/CategoryCard";

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
 
const CategorySelectSection = ({
  handleContinue,
  handleBack,
  currentCategory,
  setCurrentCategory,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`  w-full flex flex-col gap-5 p-4`}
    >
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <button onClick={handleBack} type="button" className="self-start m-5">
          <Image
            src={"/payment/back-icon.svg"}
            width={24}
            height={24}
            alt="Boton para regresar"
          />
        </button>
        <h1 className="w-full text-center font-bold sm:text-lg">
          Selecciona una categoria
        </h1>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center lg:flex-wrap lg:w-[45rem] lg:self-center">
        {list.map((e) => (
          <CategoryCard
            key={e.id}
            title={e.name}
            image={e.img}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            categoryId={e.id}
            handleContinue={handleContinue}
          />
        ))}
      </div>
      {/* <button
        onClick={handleContinue}
        alt="Reservar"
        type="button"
        className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300 lg:w-[21rem]"
      >
        Continuar
      </button> */}
    </motion.section>
  );
};

export default CategorySelectSection;
