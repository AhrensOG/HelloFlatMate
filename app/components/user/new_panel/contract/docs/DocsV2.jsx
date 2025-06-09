"use client";

import React, { useState, useRef, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { isUserLogged } from "@/app/context/actions/isUserLogged";

export default function DocsV2() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const searchParams = useSearchParams();
  const leaseOrderId = searchParams.get("lo");
  const existingDoc = state.user?.documents?.find(
    (doc) => doc.leaseOrderId == leaseOrderId
  );
  const urls = existingDoc?.urls || [];

  const queryString = searchParams.toString();

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!state?.user) {
    return (
      <div className="w-full h-full p-6 text-center">
        <p className="text-gray-700">Cargando usuario...</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const pickedFile = e.target.files?.[0];
    if (pickedFile) {
      setFile(pickedFile);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleClearFile = () => {
    setFile(null);
    fileInputRef.current.value = null;
  };

  const handleUploadFile = async () => {
    // ✅ Caso 1: Ya existe documento, simplemente continuar
    if (urls.length > 0 && !file) {
      router.push(`/es/pages/user/contractv2/payments?${queryString}`);
      return;
    }

    // 🔴 Caso 2: No existe documento y no seleccionó uno nuevo
    if (!file) {
      toast.info("Primero selecciona un archivo, por favor.");
      return;
    }

    // ✅ Caso 3: Subir archivo nuevo
    const toastId = toast.loading("Subiendo documento...");
    try {
      const uploadedArray = await uploadFiles([file]);

      if (!uploadedArray || uploadedArray.length === 0) {
        throw new Error("No se pudo subir el archivo");
      }

      const bodyPayload = {
        name: "Nómina / Matrícula",
        type: "ROSTER",
        files: uploadedArray,
        userId: state.user?.id,
        typeUser: "CLIENT",
        leaseOrderId: leaseOrderId,
      };

      await axios.post("/api/document/user", bodyPayload);

      toast.success("Tus documentos se cargaron correctamente.", {
        id: toastId,
        description: "Serás redirigido al siguiente paso.",
      });

      await isUserLogged(dispatch);

      router.push(`/es/pages/user/contractv2/payments?${queryString}`);
    } catch (error) {
      console.error("Error al subir documentos:", error);
      toast.info("¡Ups! Ocurrió un error al subir el documento.", {
        id: toastId,
        description: "Intenta nuevamente o contacta a nuestro soporte.",
      });
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Carga de Documentos
      </h2>

      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Aquí debes subir <strong>tu documentación</strong> en formato PDF o
        imagen. Este archivo nos ayudará a verificar tu estado como estudiante o
        nómada digital.
      </p>

      <div className="bg-[#5ce0e5]/10 rounded-md p-3 mb-4 text-gray-800 text-sm leading-relaxed">
        <p className="font-semibold text-[#440cac]">
          ¿Qué documento necesitas subir?
        </p>
        <ul className="list-disc ml-5 mt-2">
          <li>
            <strong>Si eres estudiante universitario:</strong> Adjunta tu{" "}
            <strong>certificado de matrícula universitaria</strong>.
          </li>
          <li>
            <strong>Si eres nómada digital:</strong> Sube tu{" "}
            <strong>nómina</strong>.
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 rounded-md font-semibold text-white bg-[#440cac] hover:bg-[#440cac]/80 transition-colors">
          Subir Documento
        </button>

        <input
          type="file"
          accept=".pdf,image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {file && (
          <div className="text-sm text-[#440cac] font-medium break-all">
            {file.name}
          </div>
        )}
      </div>

      {file && (
        <div className="mt-3">
          <button
            type="button"
            onClick={handleClearFile}
            className="px-3 py-1 rounded-md text-sm font-semibold text-[#440cac]">
            Quitar archivo
          </button>
        </div>
      )}

      {urls.length > 0 && (
        <div className="mt-6 space-y-2 text-sm text-gray-800">
          <p className="font-semibold text-[#440cac]">Documento ya cargado:</p>
          <ul className="list-disc ml-5">
            {urls.map((url, index) => (
              <li key={index}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800">
                  Ver documento
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-red-600">
            Ya existe un documento cargado. Si subes uno nuevo, se reemplazará
            el actual.
          </p>
        </div>
      )}

      <div className="mt-6 p-3 rounded-md bg-[#5ce0e5]/10 text-xs text-gray-700 leading-relaxed">
        <p className="font-semibold text-[#440cac] mb-1">Importante:</p>
        <ul className="list-disc ml-4">
          <li>Formato aceptado: PDF o imagen (PNG, JPG, etc.).</li>
          <li>
            Asegúrate de que el archivo no supere los
            <strong> 5 MB</strong> para evitar problemas de carga.
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleUploadFile}
          disabled={!file && urls.length === 0}
          className={`mt-4 w-full py-3 rounded-sm font-semibold transition-colors ${
            !file && urls.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#440cac] text-white hover:bg-[#440cac]/80"
          }`}>
          Guardar y continuar
        </button>
      </div>
    </div>
  );
}
