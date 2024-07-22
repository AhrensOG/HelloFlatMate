import { uploadFiles } from "@/app/firebase/uploadFiles";
import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";

const SignaturePad = ({ setModal, handleContinue }) => {
  const sigCanvas = useRef(null);
  const [loader, setLoader] = useState(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const uploadSignature = async () => {
    setLoader(true);
    const signatureDataUrl = sigCanvas.current.toDataURL();
    const response = await fetch(signatureDataUrl);
    const blob = await response.blob();
    // const res = await uploadFiles([blob]);
    // console.log(res);
    setModal(false);
    setLoader(false);
    return handleContinue();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
      <div className="fixed w-full h-full z-10 top-0 left-0 backdrop-blur-[2px] bg-black/20 grid place-items-center">
        <div className="bg-white drop-shadow-md rounded-md p-2 px-4">
          <h3 className="font-bold py-2">Firmar Contrato</h3>
          <div className="flex justify-end items-center gap-1">
            <button
              onClick={clearSignature}
              className="text-xs flex items-center gap-1
          "
            >
              <ArrowPathIcon className="size-3" />
              Reintentar
            </button>
          </div>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 200,
              height: 100,
              className: "border-2 border-gray-300 rounded-md",
            }}
          />
          <div className="w-full flex justify-between items-center gap-1">
            <button
              onClick={() => setModal(false)}
              className="mt-2 px-4 py-2 bg-gray-300 rounded-md text-sm w-full min-h-9 flex justify-center items-center"
            >
              Cancelar
            </button>
            <button
              onClick={uploadSignature}
              className="mt-2 px-4 py-2 bg-resolution-blue text-white rounded-md text-sm w-full min-h-9 flex justify-center items-center"
            >
              {loader ? <CloudArrowUpIcon className="size-5 animate-pulse" /> : "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SignaturePad;
