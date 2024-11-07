import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ContractListItem from "./ContractListItem";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function ContractList({ action }) {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state.user || null);
  const [pendingContracts, setPendingContracts] = useState([]);
  const [historyContracts, setHistoryContracts] = useState([]);

  useEffect(() => {
    setUser(state.user);
    setPendingContracts(
      state?.user?.contracts.filter((cont) => cont.status === "PENDING")
    );
    setHistoryContracts(
      state?.user?.contracts.filter((cont) => cont.status !== "PENDING")
    );
  }, [state.user]);

  if (!pendingContracts || !historyContracts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} mx-4`}
    >
      <div className="flex items-center justify-between w-full  mt-7">
        <button
          onClick={action}
          type="button"
          className="h-7 w-7 ml-3 opacity-70"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center pr-7">
          Contratos pendientes
        </h1>
      </div>
      <section className="flex flex-col gap-3 mt-8">
        <h2 className="hidden">Contratos Pendientes</h2>
        {pendingContracts.length > 0 ? (
          pendingContracts.map((cont) => (
            <ContractListItem key={cont.id} contract={cont} />
          ))
        ) : (
          <div className="text-gray-700 text-base text-center py-4 px-6 border border-gray-300 rounded-md bg-gray-100">
            No hay contratos pendientes
          </div>
        )}
      </section>
      <section className="flex flex-col gap-3 mt-10">
        <h2 className="font-semibold text-xl text-[#222222] text-center mb-3">
          Historial de contratos
        </h2>
        {historyContracts.length > 0 ? (
          historyContracts.map((cont) => (
            <ContractListItem key={cont.id} contract={cont} />
          ))
        ) : (
          <div className="text-gray-700 text-base text-center py-4 px-6 border border-gray-300 rounded-md bg-gray-100">
            No hay contratos pendientes
          </div>
        )}
      </section>
    </motion.main>
  );
}
