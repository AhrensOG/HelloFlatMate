import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { motion } from "framer-motion";
import UserSerivceNavBar from "./UserServiceNavBar";
import { useRouter } from "next/navigation";

export default function HistoryUserProfileNavBar({ title }) {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6"
    >
      <UserSerivceNavBar />
      <div className="flex justify-center items-center w-full">
        <button
          onClick={() => {
            router.back();
          }}
          type="button"
          className="w-6 h-6 opacity-70 ml-4"
        >
          <ArrowLeftIcon />
        </button>
        <h2 className=" text-[#000000CC] font-bold text-xl mx-auto">{title}</h2>
      </div>
    </motion.nav>
  );
}
