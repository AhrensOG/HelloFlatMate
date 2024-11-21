 
import { useContext, useEffect, useState } from "react";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import DocumentListItem from "../../user/documents/DocumentListItem";
import EyeButton from "./EyeButton";
import PreviewModal from "./PreviewModal";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import axios from "axios";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DocumentsPanel() {
  const [showModal, setShowModal] = useState();
  const [previewDocument, setPreviewDocument] = useState("");
  const [documents, setDocuments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/admin/document");
        setDocuments(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error al cargar los documentos");
      }
    };
    if (!documents) {
      fetchData();
    }
  }, [documents]);

  const handleOpenModal = (data) => {
    setPreviewDocument(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setPreviewDocument("");
    setShowModal(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  if (!documents) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <main
        className={`  flex flex-col gap-5 p-2 items-center`}
      >
        <TitleAdminPanel title={"Documentos"} />
        <section className="w-full flex flex-col gap-4">
          {documents ? (
            documents?.map((doc, index) => {
              return (
                <DocumentListItem
                  type={doc.type === "IDENTIFICATION" ? "raw" : "pdf"}
                  title={doc.name}
                  date={formatDate(doc.updatedAt)}
                  button={
                    doc.type === "CONTRACT" ? (
                      <Link target="_blank" href={doc.urls[0]}>
                        <CloudArrowDownIcon className="w-6 h-6" />
                      </Link>
                    ) : (
                      <EyeButton action={() => handleOpenModal(doc)} />
                    )
                  }
                  status={doc.status}
                />
              );
            })
          ) : (
            <h3 className="text-lg font-semibold text-gray-500 text-center mt-4">
              No hay documentos
            </h3>
          )}
        </section>
        {showModal && (
          <PreviewModal
            action={() => handleCloseModal()}
            data={previewDocument}
          />
        )}
      </main>
    </>
  );
}
