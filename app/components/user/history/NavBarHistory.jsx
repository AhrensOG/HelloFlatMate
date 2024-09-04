import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function NavBarHistory({ title, redirect }) {
  const [displayedTitle, setDisplayedTitle] = useState(title);

  useEffect(() => {
    setDisplayedTitle(title);
  }, [title]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="flex items-center relative w-[7.51rem] h-[2.56rem]">
        <Image
          src={"/nav_bar/nav-bar-logo.svg"}
          fill
          alt="Logo de FlatMate"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex justify-center items-center pl-8 pr-16 w-full">
        <button
          onClick={redirect}
          type="button"
          className="w-6 h-6 opacity-90 ml-4"
        >
          <ArrowLeftIcon />
        </button>
        <AnimatePresence mode="wait">
          <motion.h2
            key={displayedTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[#000000CC] font-bold text-xl grow text-center"
          >
            {displayedTitle}
          </motion.h2>
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
