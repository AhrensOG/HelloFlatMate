import { useState } from "react";
import { motion } from "framer-motion";

export default function ButtonsDashBoardAdmin() {
  const [buttonSelected, setButtonSelected] = useState("month");

  const handleButtonSelected = (button) => {
    setButtonSelected(button);
  };

  return (
    <article className="w-[19rem] self-center h-[3.3rem] flex justify-center items-center bg-[#7676801F] rounded-lg text-base font-semibold">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        whileFocus={{ scale: 1.1 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        onClick={() => handleButtonSelected("day")}
        className={`${
          buttonSelected === "day" &&
          "rounded-lg bg-white border border-[#0000000A] shadow-double-shadow"
        } text-center mr-1 h-[3rem] w-[6.5rem]`}
        type="button"
      >
        Diarias
      </motion.button>
      <span
        className={`${
          buttonSelected === "day" || buttonSelected === "week"
            ? "bg-transparent"
            : "bg-[#3C3C435C]"
        } w-[1px] h-[60%]`}
      ></span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        whileFocus={{ scale: 1.1 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        onClick={() => handleButtonSelected("week")}
        className={`${
          buttonSelected === "week" &&
          "rounded-lg bg-white border border-[#0000000A] shadow-double-shadow"
        } text-center mr-1 h-[3rem] w-[6.5rem]`}
        type="button"
      >
        Semanales
      </motion.button>
      <span
        className={`${
          buttonSelected === "week" || buttonSelected === "month"
            ? "bg-transparent"
            : " bg-[#3C3C435C]"
        } w-[1px] h-[60%]`}
      ></span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        whileFocus={{ scale: 1.1 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        onClick={() => handleButtonSelected("month")}
        className={`${
          buttonSelected === "month" &&
          "rounded-lg bg-white border border-[#0000000A] shadow-double-shadow"
        } text-center mr-1 h-[3rem] w-[6.5rem]`}
        type="button"
      >
        Mensuales
      </motion.button>
    </article>
  );
}
