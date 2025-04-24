"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Context } from "@/app/context/GlobalContext";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";
import OwnerSignaturePad from "./auxiliarComponents/OwnerSignaturePad";
import Image from "next/image";
import Link from "next/link";

const formatToDateInput = (date) => {
  if (!date) return null;

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return null;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const OwnerSignature = () => {
  const { state } = useContext(Context);
  const { contractId } = useParams();

  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [isSignedSuccessfully, setIsSignedSuccessfully] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  const fetchContract = async () => {
    try {
      if (
        !state.user ||
        state.user === false ||
        typeof state.user !== "object" ||
        !state.user.id
      ) {
        return;
      }

      const res = await fetch(
        `/api/owner/new_panel/contracts?contractId=${contractId}`
      );
      const data = await res.json();

      if (!data || !data.id) {
        setError("No se encontró el contrato.");
      } else if (data.ownerId !== state.user.id) {
        setError("No tienes permiso para acceder a este contrato.");
      } else {
        setContract(data);
      }
    } catch (err) {
      setError("Ocurrió un error al cargar el contrato.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [state.user, contractId]);

  const onSignContract = async (signatureDataUrl) => {
    if (!contract || !signatureDataUrl) return;

    const toastId = toast.loading("Subiendo firma...");

    try {
      const response = await fetch(signatureDataUrl);
      const blob = await response.blob();

      const timestamp = Date.now();
      const ownerFdoSanitized = contract.ownerFdoData
        ?.replace(/\s+/g, "_")
        ?.replace(/[^a-zA-Z0-9_]/g, "");

      const start = formatToDateInput(contract.startDate);
      const end = formatToDateInput(contract.endDate);

      const folder = `Contratos_Propietarios/${ownerFdoSanitized}/${start}-${end}/signature`;
      const name = `${ownerFdoSanitized}_${timestamp}.png`;

      const uploaded = await uploadFiles([blob], folder, name);
      const signatureImageUrl = uploaded[0]?.url;

      const body = {
        id: contract.id,
        isSigned: true,
        signedAt: new Date().toISOString(),
        originalPdfUrl: contract.originalPdfUrl,
        ownerSignature: signatureImageUrl,
        ownerFdoData: contract.ownerFdoData,
        hfmFdoData: contract.hfmFdoData,
        startDate: contract.startDate,
        endDate: contract.endDate,
      };

      await axios.post("/api/owner/new_panel/contracts", body);
      await fetchContract();
      toast.success("Contrato firmado correctamente", { id: toastId });
      setShowModal(false);
      setIsSignedSuccessfully(true);
    } catch (err) {
      console.error(err);
      toast.error("Error al firmar el contrato", { id: toastId });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white pb-6">
      <div className="w-full h-full flex flex-col justify-start items-start">
        {isSignedSuccessfully ? (
          <div className="w-full h-full grid place-items-center text-center">
            <div className="grid place-items-center gap-4">
              <Image
                src={"/howitworks/verificado.gif"}
                width={130}
                height={130}
              />
              <h2 className="text-2xl font-bold mb-2">
                ¡Gracias por tu firma!
              </h2>
              <p className="text-sm mb-4">
                El contrato ha sido firmado correctamente y podrás verlo
                actualizado en tus contratos.
              </p>
              <Link
                href="/pages/owner/contracts"
                className="inline-block bg-[#440cac] text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-[#440cac]/90 transition">
                Volver a mis contratos
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Firma de contrato
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              Revisa el contrato y procede con la firma si estás de acuerdo con
              las condiciones.
            </p>

            {isLoading && (
              <div className="w-full animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/3" />
                <div className="h-[500px] bg-gray-200 rounded" />
              </div>
            )}

            {!isLoading && error && (
              <div className="w-full bg-red-100 text-red-700 border border-red-300 rounded p-4 text-sm">
                {error}
              </div>
            )}

            {!isLoading && contract && contract.originalPdfUrl && (
              <>
                <div className="w-full border rounded-lg overflow-hidden shadow">
                  <iframe
                    src={contract.originalPdfUrl}
                    title="Contrato PDF"
                    className="w-full h-[600px]"
                  />
                  <div className="p-4 text-sm text-gray-500 flex gap-4 border-t">
                    <DocumentTextIcon className="w-5 h-5" />
                    Documento original proporcionado por helloFlatmate.
                  </div>
                </div>
                {contract.isSigned ? (
                  <div className="pt-4 mt-2 w-full flex flex-col gap-2 bg-green-50 border border-green-200 p-4 rounded-md">
                    <p className="text-sm text-green-800 font-medium">
                      Este contrato ya ha sido firmado.
                    </p>
                    <p className="text-sm text-green-700">
                      Si crees que se trata de un error, por favor contacta con
                      nuestro equipo de soporte.
                    </p>
                  </div>
                ) : (
                  <div className="pt-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="read-confirm"
                        checked={hasRead}
                        onChange={(e) => setHasRead(e.target.checked)}
                        className="size-4"
                      />
                      <label htmlFor="read-confirm" className="text-sm">
                        Confirmo que he leído y estoy de acuerdo con los
                        términos del contrato.
                      </label>
                    </div>

                    <button
                      onClick={() => setShowModal(true)}
                      disabled={!hasRead}
                      className={`text-sm font-semibold py-2 px-6 rounded-md transition w-fit ${
                        hasRead
                          ? "bg-[#440cac] text-white hover:bg-[#440cac]/90"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}>
                      Firmar contrato
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {showModal && (
        <OwnerSignaturePad
          onSignContract={onSignContract}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default OwnerSignature;
