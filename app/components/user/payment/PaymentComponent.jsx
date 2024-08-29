"use client";
import { plus_jakarta } from "@/font";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
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

  const uploadDocuments = async () => {
    const documents = [
      {
        name:
          "Contrato " +
          state.reservationInfo?.userContractInformation.name +
          " " +
          state.reservationInfo?.userContractInformation.lastName,
        type: "CONTRACT",
        url: pdfUrl,
        userId: state.reservationInfo?.userContractInformation.id,
        typeUser: "CLIENT",
      },
    ];
    try {
      //Cargar DNI en firebase
      if (userDocuments.dni) {
        const dniUrl = await uploadFiles(
          userDocuments.dni,
          "Documentos",
          state.reservationInfo?.userContractInformation.name +
            " " +
            state.reservationInfo?.userContractInformation.lastName +
            " - Identificacion"
        );
        if (dniUrl) {
          documents.push({
            name: dniUrl[0].name,
            type: "IDENTIFICATION",
            url: dniUrl[0].url,
            userId: state.reservationInfo?.userContractInformation.id,
            typeUser: "CLIENT",
          });
        } else {
          toast.error("Error al cargar la identificacion");
        }
      }
      //Cargar Nomina en firebase
      if (userDocuments.nomina) {
        const nominaUrl = await uploadFiles(
          userDocuments.nomina,
          "Documentos",
          state.reservationInfo?.userContractInformation.name +
            " " +
            state.reservationInfo?.userContractInformation.lastName +
            " - Nomina"
        );
        if (nominaUrl) {
          documents.push({
            name: nominaUrl[0].name,
            type: "ROSTER",
            url: nominaUrl[0].url,
            userId: state.reservationInfo?.userContractInformation.id,
            typeUser: "CLIENT",
          });
        } else {
          toast.error("Error al cargar la Nomina");
        }
      }
      await createDocuments(documents);
      await updateUserSignature(state.reservationInfo?.signature[0]);
    } catch (error) {
      toast.error("Error al crear los documentos");
    }
  };

  const createDocuments = async (array) => {
    if (array) {
      try {
        array.forEach(async (document) => {
          await axios.post("/api/document", document);
        });
      } catch (error) {
        toast.error("Error al crear los documentos");
      }
    }
  };

  const updateUserSignature = async (url) => {
    try {
      await axios.patch("/api/user", {
        id: state.reservationInfo?.userContractInformation.id,
        signature: url,
      });
    } catch (error) {
      console.log(error);

      toast.error("Error al actualizar la firma");
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
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
              handleContinue();
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
