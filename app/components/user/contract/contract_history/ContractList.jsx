import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import ContractListItem from "./ContractListItem";
import { motion } from "framer-motion";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function ContractList({ action }) {
  const { state } = useContext(Context);
  const [user, setUser] = useState(state.user || null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.user) {
      setUser(state.user);
      fetchContracts(state.user.id);
    }
  }, [state.user]);

  const fetchContracts = async (userId) => {
    try {
      const response = await axios.get(`/api/contract?clientId=${userId}`);
      setContracts(response.data?.contract);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 space-y-2">
        <div className="relative flex items-center justify-between w-full py-10">
          <button
            onClick={action}
            type="button"
            className="h-7 w-7 opacity-70 absolute left-3"
          >
            <ArrowLeftIcon />
          </button>
          <h1 className="font-semibold text-xl text-[#191B23] grow text-center">
            Historial de contratos
          </h1>
        </div>
        {[1, 2, 3].map((i) => (
          <article
            key={i}
            className={`flex flex-col w-full gap-3 border border-[#ECECEC] p-3 rounded-2xl animate-pulse`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center h-10 w-10 bg-gray-300 rounded-lg">
                <div className="h-6 w-6 bg-gray-400 rounded"></div>
              </div>
              <div className="flex flex-col gap-1 grow pl-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-3 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  // const pendingContracts = contracts.filter(
  //   (cont) => cont.status === "PENDING"
  // );
  const historyContracts = contracts.filter(
    (cont) => cont.status !== "PENDING"
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-4"
    >
      <div className="relative flex items-center justify-between w-full pt-10">
        <button
          onClick={action}
          type="button"
          className="h-7 w-7 opacity-70 absolute left-3"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center">
          Historial de contratos
        </h1>
      </div>
      {/* <section className="flex flex-col gap-3 mt-8">
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
      </section> */}
      <section className="flex flex-col gap-3 mt-10">
        {/* <h2 className="font-semibold text-xl text-[#222222] text-center mb-3">
          Historial de contratos
        </h2> */}
        {historyContracts.length > 0 ? (
          historyContracts.map((cont) => (
            <ContractListItem key={cont.id} contract={cont} />
          ))
        ) : (
          <div className="text-gray-700 text-base text-center py-4 px-6 border border-gray-300 rounded-md bg-gray-100">
            Aún no tienes contratos en el historial. Si ya alquilaste una
            habitación, no te preocupes, estamos migrando los datos. Si aún no
            lo hiciste, puedes explorar nuestras opciones.
          </div>
        )}
      </section>
    </motion.main>
  );
}
