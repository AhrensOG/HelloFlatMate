import Image from "next/image";
import CheckBox from "./select_contract/CheckBox";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function SelectContract({ data, setData }) {
  const [showUl, setShowUl] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    "Seleccionar tipo de contrato"
  );

  const handleClick = () => {
    setShowUl(!showUl);
  };

  const handleValue = (value) => {
    setSelectedValue(value);
    setData({ ...data, duracion: value });
    console.log(data);
  };

  return (
    <section className="w-[19.4rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
        onClick={handleClick}
      >
        {selectedValue}{" "}
        <span
          className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showUl ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showUl && (
          <motion.ul
            className="flex flex-col shadow-reservation-list mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <CheckBox
              name="5_meses"
              body="5 Meses"
              callback={handleValue}
              selectedValue={selectedValue}
            />
            <CheckBox
              name="10_meses"
              body="10 Meses"
              callback={handleValue}
              selectedValue={selectedValue}
            />
            <CheckBox
              name="15_meses"
              body="15 Meses"
              callback={handleValue}
              selectedValue={selectedValue}
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}