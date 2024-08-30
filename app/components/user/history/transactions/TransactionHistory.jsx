import NavBarHistory from "../NavBarHistory";
import TransactionCardHistory from "./TransactionCardHistory";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionHistory({ redirect }) {
  return (
    <AnimatePresence>
      <header className="my-2">
        <NavBarHistory redirect={redirect} title={"Transacciones"} />
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4 py-4 mx-4"
      >
        <TransactionCardHistory
          tittle={"Pago Renta"}
          price={400}
          date={"02 de Agosto"}
          typeRoom={"HelloRoom"}
        />
        <TransactionCardHistory
          tittle={"Pago Renta"}
          price={400}
          date={"02 de Agosto"}
          typeRoom={"HelloRoom"}
        />
      </motion.main>
    </AnimatePresence>
  );
}
