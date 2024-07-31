import { MapPinIcon } from "@heroicons/react/24/outline";
import ApplicationCardHistory from "../../history/application/ApplicationCardHistory";
import { plus_jakarta } from "@/font";
import { motion } from "framer-motion";
import TitleSection from "../TitleSection";
import DescriptionSection from "./task_details/DescriptionSection";
import TenatnsNote from "./task_details/TenatnsNote";
import LocationSection from "./task_details/LocationSection";
import Buttons from "./task_details/Buttons";
import TaskModal from "./task_details/modal/TaskModal";
import { useState } from "react";

export default function TaskDetails() {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("pending");

  const handleShowModal = (type, status = "pending") => {
    setStatus(status);
    setType(type);
    setShowModal(!showModal);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col gap-3 py-4 m-4`}
    >
      <TitleSection title={"Historial de tareass"} />
      <div className="flex flex-col gap-1">
        <div className="border bg-gris-español w-full"></div>
        <ApplicationCardHistory
          // action={handleShowdetails}
          type={"repair"}
          status={status}
          title={"Reparar toma corrientes"}
          resumen={"Reparar toma corrientes"}
          date={"Lunes 1 de Julio 2024 a las 09:12"}
        />
        <div className="border bg-gris-español w-full"></div>
      </div>

      <section className="flex flex-col justify-center items-center gap-6">
        <DescriptionSection />
        <TenatnsNote
          body={
            "Intente usar mi secador de pelo pero el tomacorrientes no funciona"
          }
        />
        <LocationSection />
        {status === "pending" && <Buttons action={handleShowModal} />}
      </section>
      {showModal && <TaskModal type={type} action={handleShowModal} />}
    </motion.main>
  );
}
