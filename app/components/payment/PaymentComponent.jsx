"use client";
import { plus_jakarta } from "@/font";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import TitleSection from "../contract/TitleSection";

export default function PaymentComponent({ handleContinue, handleBack }) {
  const { state } = useContext(Context);
  const pdfUrl = state.contractPdfData?.url;

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
          title={"Resumen y Pago"}
          action={() => {
            handleBack();
          }}
        />
      </div>
      <div className="flex justify-between font-semibold text-[#222222] text-[1.37rem]">
        <h2>Total (USD)</h2>
        <p>$440</p>
      </div>
      <div className="h-[1px] bg-[#DDDDDD]"></div>
      <div className="flex flex-col gap-3 text-[#222222]">
        <h2 className="text-[1.37rem] text-semibold">
          Política de cancelación
        </h2>
        <p className="text-base font-normal">
          Esta reserva no es reembolsable.
        </p>
        <Link
          href="#"
          className="underline text-base font-normal"
          alt="Política de cancelación"
        >
          Más información
        </Link>
      </div>
      <div className="h-[1px] bg-[#DDDDDD]"></div>
      <div className="text-base font-normal text-[#222222]">
        <h4>
          Al seleccionar el botón,{" "}
          <span className="font-semibold">
            acepto los términos y condiciones de la reserva.
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
        onClick={handleContinue}
        alt="Confirmar y pagar"
        type="button"
        className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient border border-resolution-blue hover:bg-payment-button-gradient-hover transition-all duration-300"
      >
        Confirmar y pagar
      </button>
    </motion.section>
  );
}
