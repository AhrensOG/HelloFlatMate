import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import DocumentListItem from "./DocumentListItem";
import { ArrowLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Context } from "@/app/context/GlobalContext";
import formatDateToDDMMYYYY from "../../admin/new_panel/utils/formatDate";

export default function DocumentsList({ action }) {
  const { state } = useContext(Context);
  const [user, setUser] = useState(state.user || null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.user) {
      setUser(state.user);
      fetchDocuments(state.user.id);
    }
  }, [state.user]);

  const fetchDocuments = async (userId) => {
    try {
      const response = await axios.get(`/api/document/user?userId=${userId}`);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
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

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center gap-6 items-center mx-4"
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
          Mis documentos
        </h1>
      </div>
      <div className="flex flex-col gap-3 py-4 w-full">
        {documents.length > 0 ? (
          documents.map((doc) =>
            doc.urls.map((url, index) => (
              <DocumentListItem
                key={index}
                type={doc.type === "IDENTIFICATION" ? "raw" : "pdf"}
                title={doc.name}
                date={formatDateToDDMMYYYY(doc.updatedAt)}
                status={doc.status}
                roomSerial={doc.room?.serial || "N/A"}
                button={
                  url ? (
                    <Link target="_blank" href={url}>
                      <ArrowDownTrayIcon className="w-6 h-6" />
                    </Link>
                  ) : (
                    false
                  )
                }
              />
            ))
          )
        ) : (
          <h3 className="text-lg font-semibold text-gray-500 text-center mt-4">
            Aún no tienes documentos. Si ya alquilaste una habitación, no te
            preocupes, estamos migrando los datos. Si aún no lo hiciste, puedes
            explorar nuestras opciones.
          </h3>
        )}
      </div>
    </motion.main>
  );
}
