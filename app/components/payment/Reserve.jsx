"use client";
import { plus_jakarta } from "@/font";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Reserve({ handleContinue, handleBack }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
        >
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
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 text-base font-normal text-[#222222]">
                    <div className="flex justify-between items-center">
                        <p className="underline underline-offset-2">
                            500 por mes
                        </p>
                        <p>$2,500</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="underline underline-offset-2">
                            Descuento por larga estadia
                        </p>
                        <p className="text-[#008A05]">-$300</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="underline underline-offset-2">
                            Tarifa de limpieza
                        </p>
                        <p>$200</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="underline underline-offset-2">
                            Tarifa de Servicio
                        </p>
                        <p>$0</p>
                    </div>
                </div>
                <div className="h-[1px] bg-[#DDDDDD]"></div>
                <div className="flex flex-col gap-5 items-center">
                    <div className="flex justify-between w-full text-base font-normal">
                        <h3 className="w-100 font-semibold">Total</h3>
                        <p>$2,400</p>
                    </div>
                    <button
                        onClick={handleContinue}
                        alt="Reservar"
                        type="button"
                        className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300"
                    >
                        Resevar
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
