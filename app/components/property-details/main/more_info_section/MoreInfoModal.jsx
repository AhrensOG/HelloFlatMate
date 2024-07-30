import { XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export default function MoreInfoModal({ body, action }) {
  return (
    <motion.aside
      className="relative p-3"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.8 }}
    >
      <button
        onClick={() => action("")}
        type="button"
        className="h-7 w-7 absolute top-1 right-4"
      >
        <XMarkIcon />
      </button>
      <p className="font-normal text-base text-black break-words whitespace-pre-line">
        {body}
      </p>
    </motion.aside>
  );
}
