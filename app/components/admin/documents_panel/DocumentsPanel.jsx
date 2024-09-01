import { plus_jakarta } from "@/font";
import { useContext, useEffect, useState } from "react";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import DocumentListItem from "../../user/documents/DocumentListItem";
import EyeButton from "./EyeButton";
import PreviewModal from "./PreviewModal";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import axios from "axios";

export default function DocumentsPanel() {
  const [showModal, setShowModal] = useState();
  const [previewDocument, setPreviewDocument] = useState("");
  const [documents, setDocuments] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/document");
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

  const handleOpenModal = (img) => {
    setPreviewDocument(img);
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
        className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
      >
        <TitleAdminPanel title={"Documentos"} />
        <section className="w-full flex flex-col gap-4">
          {documents?.map((doc) => {
            return (
              <DocumentListItem
                type={doc.type === "IDENTIFICATION" ? "raw" : "pdf"}
                title={doc.name}
                date={formatDate(doc.updatedAt)}
                button={<EyeButton action={() => handleOpenModal(doc.url)} />}
              />
            );
          })}
        </section>
        {showModal && (
          <PreviewModal
            action={() => handleCloseModal()}
            img={previewDocument}
          />
        )}
      </main>
    </>
  );
}
