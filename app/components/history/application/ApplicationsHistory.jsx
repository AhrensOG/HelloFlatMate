import NavBarHistory from "../NavBarHistory";
import ApplicationCardHistory from "./ApplicationCardHistory";
import { useState } from "react";
import ApplicationDetails from "./details/ApplicationDetails";
import { motion, AnimatePresence } from "framer-motion";
import { plus_jakarta } from "@/font";

export default function ApplicationsHistory({ redirect }) {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState({});

  const handleShowdetails = (info) => {
    setDetailsInfo(info);
    setShowDetails(!showDetails);
  };

  return (
    <AnimatePresence>
      <header className="my-2">
        <NavBarHistory
          redirect={!showDetails ? redirect : () => setShowDetails(false)}
          title={"Solicitudes"}
        />
      </header>
      {!showDetails ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`${plus_jakarta.className} flex flex-col gap-2 py-4 m-4`}
        >
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
      ) : (
        <ApplicationDetails
          action={handleShowdetails}
          type={detailsInfo.type}
          tittle={detailsInfo.title}
          location={"Ubicacion de la habitacion"}
          status={detailsInfo.status}
          body={
            "El personal de mantenimiento reparara el toma corrientes de tu baño el dia 08 / 07 a las 09:00 hs, puedes notificarnos a por soporte de cualquier problema"
          }
        />
      )}
    </AnimatePresence>
  );
}
