"use client";
import { plus_jakarta } from "@/font";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import TitleSection from "../contract/TitleSection";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { toast } from "sonner";
import axios from "axios";

export default function PaymentComponent({ handleContinue, handleBack }) {
  const { state } = useContext(Context);
  const pdfUrl = state.contractPdfData?.url;
  const userDocuments = {
    dni: state.reservationInfo?.dni,
    nomina: state.reservationInfo?.nomina,
    contract: state.contractPdfData,
    signature: state.reservationInfo?.signature,
  };
  const [existingDocuments, setExistingDocuments] = useState(
    state.user?.documents || []
  );

  const findExistingDocument = (type) => {
    return existingDocuments.find(
      (doc) =>
        doc.type === type &&
        doc.documentableId === state.reservationInfo?.userContractInformation.id
    );
  };

  const uploadDocuments = async () => {
    try {
      // Cargar o actualizar DNI en Firebase
      if (userDocuments.dni) {
        const existingDni = findExistingDocument("IDENTIFICATION");
        const dniUrl = await uploadFiles(
          userDocuments.dni,
          "Documentos",
          state.reservationInfo?.userContractInformation.name +
            " " +
            state.reservationInfo?.userContractInformation.lastName +
            " - Identificacion"
        );
        if (existingDni && dniUrl.length > 0) {
          await updateDocument({
            ...existingDni,
            url: dniUrl[0].url,
          });
        } else if (dniUrl) {
          createDocument({
            name: dniUrl[0].name,
            type: "IDENTIFICATION",
            url: dniUrl[0].url,
            userId: state.reservationInfo?.userContractInformation.id,
            typeUser: "CLIENT",
          });
        } else {
          toast.error("Error al cargar la identificación");
        }
      }

      // Cargar o actualizar Nómina en Firebase
      if (userDocuments.nomina) {
        //Verifiar si tiene ya el documento
        const existingNomina = findExistingDocument("ROSTER");
        // Primero, sube el archivo a Firebase Storage
        const nominaUrl = await uploadFiles(
          userDocuments.nomina,
          "Documentos",
          state.reservationInfo?.userContractInformation.name +
            " " +
            state.reservationInfo?.userContractInformation.lastName +
            " - Nomina"
        );
        if (nominaUrl && nominaUrl.length > 0) {
          // Si ya existe un documento, lo actualizas
          if (existingNomina) {
            await updateDocument({
              ...existingNomina,
              url: nominaUrl[0].url,
            });
          } else {
            // Si no existe, creas un nuevo documento
            await createDocument({
              name: nominaUrl[0].name,
              type: "ROSTER",
              url: nominaUrl[0].url,
              userId: state.reservationInfo?.userContractInformation.id,
              typeUser: "CLIENT",
            });
          }
        } else {
          toast.error("Error al cargar la nómina");
        }
      }

      // Cargar o actualizar Contrato en Firebase
      if (pdfUrl) {
        const existingContract = findExistingDocument("CONTRACT");
        if (existingContract) {
          await updateDocument({ ...existingContract, url: pdfUrl });
        } else {
          createDocument({
            name: userDocuments.contract.name,
            type: "CONTRACT",
            url: pdfUrl,
            userId: state.reservationInfo?.userContractInformation.id,
            typeUser: "CLIENT",
          });
        }
      }
    } catch (error) {
      toast.error("Error al crear los documentos");
    }
  };

  const createDocument = async (document) => {
    if (document) {
      try {
        await axios.post("/api/document", document);
      } catch (error) {
        toast.error("Error al crear los documentos");
      }
    }
  };

  const updateDocument = async (document) => {
    try {
      await axios.put("/api/document", document);
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar el documento");
    }
  };

  const finish = async () => {
    await uploadDocuments();
    handleContinue();
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
      {console.log(userDocuments)}
      <div className="flex items-center gap-5">
        <TitleSection
          title={"Resumen"}
          action={() => {
            handleBack();
          }}
        />
      </div>
      <div className="flex justify-between font-semibold text-[#222222] text-[1.37rem]">
        <h2>Información Adicional</h2>
        {/* <p>$440</p> */}
      </div>
      <div className="h-[1px] bg-[#DDDDDD]"></div>
      <div className="flex flex-col gap-3 text-[#222222]">
        <h2 className="text-[1.37rem] text-semibold">
          Políticas, términos y condiciones
        </h2>
        <Link
          href="#"
          className="underline text-base font-normal"
          alt="Política y Condiciones"
        >
          Más información
        </Link>
      </div>
      <div className="h-[1px] bg-[#DDDDDD]"></div>
      <div className="text-base font-normal text-[#222222]">
        <h4>
          Al seleccionar el 'Finalizar',{" "}
          <span className="font-semibold">
            acepta los términos y condiciones de la reserva.
          </span>
        </h4>
      </div>
      <div className="h-[1px] bg-[#DDDDDD]"></div>
      <Link
        href={pdfUrl}
        target="_blank"
        alt="Descargar Contrato (PDF)"
        type="button"
        className="self-center text-base font-normal text-resolution-blue h-[3.25rem] rounded-lg w-[90%] bg-white border border-resolution-blue transition-all duration-300 grid place-items-center"
      >
        Descargar Contrato (PDF)
      </Link>

      <button
        onClick={() => {
          toast.promise(uploadDocuments(), {
            loading: "Cargando...",
            success: () => {
              toast.success("Información guardada");
              finish();
            },
            error: "Error al cargar los documentos",
          });
        }}
        alt="Confirmar y pagar"
        type="button"
        className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient border border-resolution-blue hover:bg-payment-button-gradient-hover transition-all duration-300"
      >
        Finalizar
      </button>
    </motion.section>
  );
}
