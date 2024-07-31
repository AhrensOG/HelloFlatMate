import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plus_jakarta } from "@/font";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ApplicationCardHistory from "../../history/application/ApplicationCardHistory";

export default function TasksSection() {
  const [detailsInfo, setDetailsInfo] = useState({});
  const route = useRouter();

  const handleShowdetails = (info) => {
    setDetailsInfo(info);
    route.push("/pages/worker-panel/tasks/details");
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col gap-2 py-4 m-4`}
    >
      <div className="flex justify-center items-center mb-4 w-full">
        <button
          onClick={() => {
            route.back();
          }}
          type="button"
          className="w-6 h-6 opacity-70 ml-4"
        >
          <ArrowLeftIcon />
        </button>
        <h2 className=" text-[#000000CC] font-bold text-xl mx-auto">Tareas</h2>
      </div>
      <div className="border bg-gris-español "></div>
      <ApplicationCardHistory
        action={handleShowdetails}
        type={"clean"}
        status={"in_process"}
        title={"Limpieza de habitacion"}
        resumen={"Limpieza de habitacion"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español "></div>
      <ApplicationCardHistory
        action={handleShowdetails}
        type={"repair"}
        status={"completed"}
        title={"Reparar puerta"}
        resumen={"Reparar puerta de entrada"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español "></div>
      <ApplicationCardHistory
        action={handleShowdetails}
        type={"clean"}
        status={"pending"}
        title={"Limpieza de habitacion"}
        resumen={"Limpieza de habitacion"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español "></div>
    </motion.main>
  );
}
