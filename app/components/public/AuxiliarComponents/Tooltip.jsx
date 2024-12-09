import React from "react";
import { motion } from "framer-motion";

const Tooltip = ({ isOpen, content, position = "top", className }) => {
  if (!isOpen) return null;

  // Define posiciones para el Tooltip
  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <motion.div
      className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-md ${positions[position]} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {content}
    </motion.div>
  );
};

export default Tooltip;
