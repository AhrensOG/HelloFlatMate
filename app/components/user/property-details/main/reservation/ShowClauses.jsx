import Clauses from "@/app/components/user/contract/contract_detail/Clauses";
import ClausesHelloColiving from "../../../contract/contract_detail/ClausesHelloColiving";
import ClausesHelloLandlord from "../../../contract/contract_detail/ClausesHelloLandlord";
import ClausesHelloStudio from "../../../contract/contract_detail/ClausesHelloStudio";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const ShowClauses = ({
  monthlyRent,
  startDate,
  endDate,
  category,
  roomSerial,
}) => {
  const [showClauses, setShowClauses] = useState(false);

  const handleClick = () => {
    setShowClauses(!showClauses);
  };
  const renderContractClauses = () => {
    const props = { monthlyRent, startDate, endDate };
    switch (category) {
      case "HELLO_COLIVING":
        return <ClausesHelloColiving {...props} />;

      case "HELLO_LANDLORD":
        return <ClausesHelloLandlord {...props} roomNumber={roomSerial} />;

      case "HELLO_STUDIO":
        return <ClausesHelloStudio {...props} />;

      case "HELLO_ROOM":
        return <Clauses {...props} />;

      default:
        return (
          <p className="p-2 text-red-500">
            Categoría de contrato no reconocida.
          </p>
        );
    }
  };

  return (
    <section className="w-full">
      <div
        className="rounded-lg flex justify-between p-2 border items-center shadow-reservation-drop my-2 cursor-pointer bg-white"
        onClick={handleClick}>
        <span className="font-medium text-gray-700">Ver cláusulas</span>
        <span
          className={`flex justify-center items-center transition-all duration-500 ease-in-out h-[24px] w-[24px] rounded-full ${
            showClauses ? "bg-[#1C8CD65E] rotate-180" : ""
          }`}>
          <ChevronUpIcon className="h-5 w-5 text-gray-600" />
        </span>
      </div>
      <AnimatePresence>
        {showClauses && (
          <motion.div
            className="flex flex-col mt-2 p-4 border bg-white rounded-lg max-h-96 overflow-y-scroll scrollbar-thin shadow-inner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}>
            {renderContractClauses()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShowClauses;
