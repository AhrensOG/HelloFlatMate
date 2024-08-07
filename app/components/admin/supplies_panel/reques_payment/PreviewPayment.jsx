import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import FinishModal from "./FinishModal";

export default function PreviewPayment({ next, back }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 bottom-0 flex flex-col pt-3 px-4 items-center justify-between w-full min-h-[30rem] z-50 bg-[#e1eff2ff] rounded-t-3xl"
    >
      <section className="w-full h-full flex flex-col gap-6 items-center text-black ">
        <div className="mb-4 w-full flex justify-start items-center">
          <button onClick={back}>
            <ArrowLeftIcon className="h-8 w-8 opacity-75" />
          </button>
        </div>
        <article className="w-full h-[18rem] relative rounded-xl">
          <Image
            className="rounded-xl"
            src={"/admin/orden-de-pago.png"}
            alt="orden-de-pago"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </article>
        <div className="flex justify-center items-center">
          <button
            onClick={next}
            className="p-2 px-12 rounded-2xl text-white bg-[#0E155F]"
            type="button"
          >
            Generar
          </button>
        </div>
      </section>
    </motion.aside>
  );
}
