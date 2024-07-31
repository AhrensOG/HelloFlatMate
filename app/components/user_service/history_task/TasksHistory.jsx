import { useState } from "react";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import ApplicationDetails from "../../history/application/details/ApplicationDetails";
import TaskCardHistory from "./TaskCardHistory";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function TasksHistory({ redirect }) {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState({});
  const route = useRouter();
  const handleShowdetails = (info) => {
    setDetailsInfo(info);
    setShowDetails(!showDetails);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col items-center justify-center gap-2 py-4 m-4`}
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
        <h2 className=" text-[#000000CC] font-bold text-xl mx-auto">
          Historial de tareas
        </h2>
      </div>
      <div className="border bg-gris-español w-full"></div>
      <TaskCardHistory
        action={handleShowdetails}
        type={"clean"}
        title={"Limpieza de habitacion"}
        resumen={"Limpieza de habitacion"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español w-full"></div>
      <TaskCardHistory
        action={handleShowdetails}
        type={"repair"}
        title={"Reparar puerta"}
        resumen={"Reparar puerta de entrada"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español w-full"></div>
      <TaskCardHistory
        action={handleShowdetails}
        type={"clean"}
        title={"Limpieza de habitacion"}
        resumen={"Limpieza de habitacion"}
        date={"Lunes 1 de Julio 2024 a las 09:12"}
      />
      <div className="border bg-gris-español "></div>
    </motion.main>
  );
}
