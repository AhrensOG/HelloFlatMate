import NavBarHistory from "../NavBarHistory";
import ApplicationCardHistory from "./ApplicationCardHistory";
import { use, useContext, useEffect, useState } from "react";
import ApplicationDetails from "./details/ApplicationDetails";
import { motion, AnimatePresence } from "framer-motion";
 
import { Context } from "@/app/context/GlobalContext";

export default function ApplicationsHistory({ redirect }) {
  const [showDetails, setShowDetails] = useState(false);
  const [detailsInfo, setDetailsInfo] = useState({});
  const [user, setUser] = useState(null);
  const { state, dispatch } = useContext(Context);

  const handleShowdetails = (info) => {
    setDetailsInfo(info);
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    setUser(state.user);
  }, [state, dispatch]);

  const formatedDateAndHour = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });
    const time = dateFormated.toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "numeric",
    });
    return { day: day.charAt(0).toUpperCase() + day.slice(1), time: time };
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
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
          className={`  flex flex-col gap-2 py-4 m-4`}
        >
          <div className="border bg-gris-español "></div>
          {user?.toDos.map((toDo) => {
            return (
              <>
                <ApplicationCardHistory
                  action={handleShowdetails}
                  type={toDo?.type || ""}
                  status={toDo?.status || ""}
                  title={toDo?.title || ""}
                  resumen={
                    toDo?.type !== "CLEAN" ? "Reparacion" : "Limpieza" || ""
                  }
                  date={
                    new Date(toDo?.creationDate).toLocaleDateString("es-ES") ||
                    ""
                  }
                />
                <div className="border bg-gris-español "></div>
              </>
            );
          }) || <div>No hay solicitudes</div>}
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
