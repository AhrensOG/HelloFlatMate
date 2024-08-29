import { plus_jakarta } from "@/font";
import { useState } from "react";
import TitleAdminPanel from "../shared/TitleAdminPanel";
import DocumentListItem from "../../user/documents/DocumentListItem";
import EyeButton from "./EyeButton";
import PreviewModal from "./PreviewModal";

export default function DocumentsPanel() {
  const [showModal, setShowModal] = useState();
  const [previewDocument, setPreviewDocument] = useState("");

  const handleOpenModal = (img) => {
    setPreviewDocument(img);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setPreviewDocument("");
    setShowModal(false);
  };
  return (
    <>
      <main
        className={`${plus_jakarta.className} flex flex-col gap-5 p-2 items-center`}
      >
        <TitleAdminPanel title={"Documentos"} />
        <section className="w-full flex flex-col gap-4">
          <DocumentListItem
            type={"pdf"}
            title={"Contrato activo"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"dni"}
            title={"DNI"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"pdf"}
            title={"Contrato activo"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"dni"}
            title={"DNI"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"pdf"}
            title={"Contrato activo"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"dni"}
            title={"DNI"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"pdf"}
            title={"Contrato activo"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
          <DocumentListItem
            type={"dni"}
            title={"DNI"}
            date={"28 Oct 2023"}
            button={
              <EyeButton
                action={() => handleOpenModal("/admin/dni-example.png")}
              />
            }
          />
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
