import { plus_jakarta } from "@/font";
import DocumentListItem from "./DocumentListItem";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function DocumentsList({ action }) {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(state.user || null);

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`${plus_jakarta.className} flex flex-col justify-center gap-6 items-center`}
    >
      <div className="flex items-center justify-between w-full  mt-7">
        <button
          onClick={action}
          type="button"
          className="h-7 w-7 ml-3 opacity-70"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className="font-semibold text-xl text-[#191B23] grow text-center ">
          Documentos importantes
        </h1>
      </div>
      <div className="flex flex-col gap-3 py-4 px-4 w-full">
        {user?.documents?.length > 0 ? (
          user?.documents?.map((doc) => {
            return (
              <DocumentListItem
                type={doc?.type === "IDENTIFICATION" ? "raw" : "pdf"}
                title={doc?.name}
                date={formatDate(doc?.updatedAt)}
                status={doc?.status}
              />
            );
          })
        ) : (
          <h3 className="text-lg font-semibold text-gray-500 text-center mt-4">
            No hay documentos
          </h3>
        )}
      </div>
    </motion.main>
  );
}
