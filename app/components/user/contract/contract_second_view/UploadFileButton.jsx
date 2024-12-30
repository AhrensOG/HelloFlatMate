import Image from "next/image";
import { useRef, useState, useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import { saveUserContractDocuments } from "@/app/context/actions";
import { toast } from "sonner";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function UploadFileButton({ description, id, setNext }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(description);
  const { dispatch } = useContext(Context);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 2) {
      return toast.info("Máximo permitido: 2 Imagenes");
    }
    if (files.length) {
      const values = {
        id,
        files,
      };
      setFileName(files.length);
      saveUserContractDocuments(dispatch, values);
      setNext(true);
      return toast.success("Documentos almacenados");
    }
  };

  return (
    <div className="bg-[#DDDDDD] rounded-lg border border-[#DDDDDD] shadow-[0px_4px_4px_0px_#00000040] min-w-[185px] flex justify-center items-center">
      <button
        className="flex items-center gap-2 p-1"
        onClick={handleButtonClick}
      >
        {typeof fileName === "number"
          ? `Seleccionados (${fileName})`
          : fileName}
        {typeof fileName !== "number" ? (
          <span>
            <ArrowUpTrayIcon className="size-4" />
          </span>
        ) : null}
      </button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
