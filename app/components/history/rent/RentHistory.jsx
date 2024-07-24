import NavBarHistory from "../NavBarHistory";
import RentCardHistory from "./RentCardHistory";
import { motion, AnimatePresence } from "framer-motion";

export default function RentHistory({ redirect }) {
  return (
    <AnimatePresence>
      <header className="my-2">
        <NavBarHistory redirect={redirect} title={"Historial de renta"} />
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className=" flex flex-col gap-2 py-4"
      >
        <RentCardHistory
          status={"En renta"}
          title={"HelloRoom"}
          ubicacion={"Ubicacion de la habitacion"}
          precio={"1400"}
        />
        <RentCardHistory
          status={"Renta terminada"}
          title={"HelloRoom"}
          ubicacion={"Ubicacion de la habitacion"}
          precio={"1400"}
        />
        <RentCardHistory
          status={"Renta terminada"}
          title={"HelloRoom"}
          ubicacion={"Ubicacion de la habitacion"}
          precio={"1400"}
        />
      </motion.main>
    </AnimatePresence>
  );
}
