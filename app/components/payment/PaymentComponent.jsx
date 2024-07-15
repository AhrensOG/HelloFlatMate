"use client";
import { plus_jakarta, poppins } from "@/font";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PaymentComponent({ handleContinue, handleBack }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${plus_jakarta.className} w-full h-[90vh] flex flex-col gap-7 p-4`}
        >
            <div className="flex items-center gap-5">
                <button
                    onClick={handleBack}
                    type="button"
                    className="self-start m-5"
                >
                    <Image
                        src={"/payment/back-icon.svg"}
                        width={24}
                        height={24}
                        alt="Boton para regresar"
                    />
                </button>
                <h1
                    className={`${poppins.className} text-[#191B23] font-semibold text-xl`}
                >
                    ¿Cómo te gustaría pagar?
                </h1>
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
                <Link href="#" className="underline text-base font-normal">
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
            <button
                onClick={handleContinue}
                type="button"
                className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300"
            >
                Confirmar y pagar
            </button>
        </motion.section>
    );
}
