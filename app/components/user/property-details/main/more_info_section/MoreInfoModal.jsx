import { XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

export default function MoreInfoModal({ body, action }) {
  return (
    <motion.aside
      className="relative p-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-normal text-base text-black break-words whitespace-pre-line text-justify">
        {body}
      </p>
    </motion.aside>
  );
}
