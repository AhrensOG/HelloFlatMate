import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeaderChats() {
  const router = useRouter();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-between items-center px-2 py-3"
    >
      <button onClick={() => router.back()} className="h-7 w-7 " type="button">
        <ChevronLeftIcon />
      </button>
      <h1 className="font-bold text-xl">Chats</h1>
      <button className="h-7 w-7" type="button">
        <QuestionMarkCircleIcon />
      </button>
    </motion.section>
  );
}
