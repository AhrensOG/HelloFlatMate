import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { plus_jakarta } from "@/font";
import ApplicationDetails from "../../history/application/details/ApplicationDetails";
import HistoryUserProfileNavBar from "../nav_bar/HistoryUserProfivleNavBar";
import TaskCardHistory from "./TaskCardHistory";

export default function TasksHistory({ redirect }) {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState({});
  const handleShowdetails = (info) => {
    setDetailsInfo(info);
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      <header className="px-2">
        <HistoryUserProfileNavBar title={"Historial de tareas"} />
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`${plus_jakarta.className} flex flex-col items-center justify-center gap-2 py-4 m-4`}
      >
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
    </AnimatePresence>
  );
}
