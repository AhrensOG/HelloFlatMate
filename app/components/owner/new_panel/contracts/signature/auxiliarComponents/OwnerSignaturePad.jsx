"use client";

import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/20/solid";
import SignatureCanvas from "react-signature-canvas";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const OwnerSignaturePad = ({ onSignContract, onClose }) => {
  const sigCanvas = useRef(null);
  const [loader, setLoader] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const validateSignature = () => {
    const signatureData = sigCanvas.current.toData();
    const minimumStrokes = 1;
    const minimumPoints = 50;

    if (signatureData.length < minimumStrokes) return false;

    const totalPoints = signatureData.reduce(
      (acc, stroke) => acc + stroke.length,
      0
    );

    return totalPoints >= minimumPoints;
  };

  const uploadSignature = async () => {
    if (sigCanvas.current.isEmpty() || !validateSignature()) {
      toast.info("Por favor, firme adecuadamente antes de continuar.", {
        description: "La firma no debe estar vacía o ser muy corta",
      });
      sigCanvas.current.clear();
      return;
    }

    try {
      setLoader(true);
      setDisableButton(true);

      const dataUrl = sigCanvas.current.toDataURL();
      await onSignContract(dataUrl);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al subir la firma.");
    } finally {
      setLoader(false);
      setDisableButton(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-7 p-4">
      <div className="fixed w-full h-full z-40 top-0 left-0 backdrop-blur-[2px] bg-black/20 grid place-items-center">
        <div className="bg-white drop-shadow-md rounded-md p-2 px-4">
          <h3 className="font-bold py-2">Firmar Contrato</h3>
          <div className="flex justify-end items-center gap-1">
            <button
              onClick={clearSignature}
              className="text-xs sm:text-sm flex items-center gap-1">
              <ArrowPathIcon className="size-3 sm:size-4" />
              Reintentar
            </button>
          </div>

          {/* Canvas móvil */}
          <div className="block sm:hidden">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 250,
                height: 125,
                className: "border-2 border-gray-300 rounded-md",
              }}
            />
          </div>

          {/* Canvas desktop */}
          <div className="hidden sm:block">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 250,
                className: "border-2 border-gray-300 rounded-md",
              }}
            />
          </div>

          <div className="w-full flex justify-between items-center gap-1">
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-gray-300 rounded-md text-sm w-full min-h-9 flex justify-center items-center">
              Cancelar
            </button>

            <button
              onClick={uploadSignature}
              disabled={disableButton}
              className={`mt-2 px-4 py-2 ${
                !disableButton ? "bg-[#440cac]" : "bg-gray-400"
              } text-white rounded-md text-sm w-full min-h-9 flex justify-center items-center`}>
              {loader ? (
                <CloudArrowUpIcon className="size-5 animate-pulse" />
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OwnerSignaturePad;
