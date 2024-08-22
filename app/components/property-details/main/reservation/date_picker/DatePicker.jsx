import { useState } from "react";
import Month from "./Month";
import HeaderDatePicker from "./HeaderDatePicker";
import { FooterDatePicker } from "./FooterDatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function DatePicker({ data, setData }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [currentDay, setCurrentDay] = useState(date.getDate());
  const [selectedDate, setSelectedDate] = useState("");

  //Show DatePicker
  const handleShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  //Select date
  const handleSelectDate = (date) => {
    const formattedDate = date.toLocaleDateString("es-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setSelectedDate(formattedDate);
    setData({ ...data, fecha: date.toISOString() });
    console.log(data);
  };

  const handleCancel = (isCancel) => {
    if (isCancel) {
      setShowDatePicker(false);
      setSelectedDate("");
    } else {
      setShowDatePicker(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="relative rounded-lg shadow-reservation-drop my-2 cursor-pointer">
        <div className="p-3 rounded-lg  text-base border bg-white border-white w-[19.4rem] flex justify-between items-center">
          <input
            defaultValue={selectedDate}
            onClick={handleShowDatePicker}
            value={selectedDate}
            className="aparence-none outline-none w-full"
            type="text"
            placeholder="Seleccione la fecha"
          />
          <span
            onClick={handleShowDatePicker}
            className={`${
              showDatePicker ? "bg-[#1C8CD65E]" : ""
            } h-5 w-5 rounded-full`}
          >
            <ChevronUpIcon />
          </span>
        </div>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className=" my-1 bg-white p-3 rounded-md w-[19.4rem] min-h-[19.4rem]"
          >
            {/* header */}
            <HeaderDatePicker
              year={{ year, setYear }}
              month={{ month, setMonth }}
              date={{ date, setDate }}
              day={{ selectedDate, setSelectedDate }}
              callback={handleSelectDate}
            />

            {/* //weakk */}
            <div className="grid grid-cols-7 gap-x-4 my-3">
              <span className="text-[#B5BEC6] text-sm text-center">Dom</span>
              <span className="text-[#B5BEC6] text-sm text-center">Lun</span>
              <span className="text-[#B5BEC6] text-sm text-center">Mar</span>
              <span className="text-[#B5BEC6] text-sm text-center">Mie</span>
              <span className="text-[#B5BEC6] text-sm text-center">Jue</span>
              <span className="text-[#B5BEC6] text-sm text-center">Vie</span>
              <span className="text-[#B5BEC6] text-sm text-center">Sab</span>
            </div>
            {/* //Month */}
            <Month
              year={year}
              month={month}
              currentDay={currentDay}
              callback={handleSelectDate}
              date={date}
              selectedDate={selectedDate}
            />
            <FooterDatePicker callback={handleCancel} />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
