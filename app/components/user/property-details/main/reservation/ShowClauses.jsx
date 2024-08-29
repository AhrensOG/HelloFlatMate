import Clauses from "@/app/components/user/contract/contract_detail/Clauses";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const ShowClauses = () => {
  const [showClauses, setShowClauses] = useState(false);

  const handleClick = () => {
    setShowClauses(!showClauses);
  };

  return (
    <section className="w-[19.4rem]">
      <div
        className="rounded-lg flex justify-between p-2 items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
        onClick={handleClick}
      >
        Ver clausulas
        <span
          className={`flex justify-center items-center transition-all duration-1000 ease-in-out h-[24px] w-[24px] rounded-full ${
            showClauses ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}
        >
          <ChevronUpIcon />
        </span>
      </div>
      <AnimatePresence>
        {showClauses && (
          <motion.div
            className="flex flex-col mt-2 p-1 bg-white rounded-lg max-h-44 overflow-y-scroll"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Clauses />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowClauses;
