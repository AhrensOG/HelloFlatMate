"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NavBarProfile({ action }) {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="m-2 flex"
    >
      <button
        onClick={action != null ? action : handleRedirect}
        type="button"
        className="w-7 h-7 self-center"
      >
        <XMarkIcon />
      </button>
      <div className="w-[7.81rem] h-[2.56rem] m-auto relative">
        <Image
          src={"/nav_bar/nav-bar-logo.svg"}
          fill
          alt="Logo de FlatMate"
          objectPosition="center"
        />
      </div>
    </motion.nav>
  );
}
