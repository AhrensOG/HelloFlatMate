import Image from "next/image";
import { useRef, useState, useContext } from "react";
import { Context } from "@/app/context/GlobalContext";

export default function UploadFileButton({ description, id }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(description);
  const { dispatch } = useContext(Context);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const fileUrl = URL.createObjectURL(file);
      dispatch({ type: "SET_IMAGE_URL", payload: { id, url: fileUrl } });
    }
  };

  return (
    <div className="bg-[#DDDDDD] rounded-lg border border-[#DDDDDD] shadow-[0px_4px_4px_0px_#00000040]">
      <button
        className="flex items-center gap-2 p-1"
        onClick={handleButtonClick}
      >
        {fileName}{" "}
        <span>
          <Image
            src={"/contract/second_view/upload-file-icon.svg"}
            width={14}
            height={14}
            alt={"upload_view"}
          />
        </span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
