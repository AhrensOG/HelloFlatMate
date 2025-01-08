import Clauses from "@/app/components/user/contract/contract_detail/Clauses";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const ShowClauses = ({ mothlyRent, startDate, endDate }) => {
  const [showClauses, setShowClauses] = useState(false);

  const handleClick = () => {
    setShowClauses(!showClauses);
  };

  return (
    <section className="w-full">
      <div
        className="rounded-lg flex justify-between p-2 border items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
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
            className="flex flex-col mt-2 p-1 border bg-white rounded-lg max-h-44 overflow-y-scroll scrollbar-thin"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Clauses monthlyRent={mothlyRent} startDate={startDate} endDate={endDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowClauses;
