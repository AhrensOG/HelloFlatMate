import { CheckCircleIcon, CheckIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function FinishModal({ action }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 bottom-0 flex flex-col pt-3 px-4 items-center justify-between w-full min-h-[30rem] z-50 bg-[#e1eff2ff] rounded-t-3xl"
    >
      <section className="w-full h-full flex flex-col gap-6 items-center text-black ">
        <div className="mb-4 w-full flex justify-end items-center">
          <button onClick={action}>
            <XMarkIcon className="h-8 w-8 opacity-75" />
          </button>
        </div>
        <article className="flex flex-col justify-center items-center gap-6">
          <div className=" bg-thank-you h-20 w-20 rounded-full flex justify-center items-center">
            <CheckIcon className="h-16 w-16 text-[#e1eff2ff]" />
          </div>
          <h2 className="font-semibold text-2xl">Listo</h2>
          <p className="font-semibold text-base">Orden generada con exito</p>
        </article>
      </section>
    </motion.aside>
  );
}
