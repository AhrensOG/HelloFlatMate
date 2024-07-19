"use client";
import Image from "next/image";
import { plus_jakarta, poppins } from "@/font";
import { motion, AnimatePresence } from "framer-motion";

export default function AddPaymentMethod({ handleContinue, handleBack }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
        >
            <div className="flex items-center gap-5">
                <button
                    onClick={handleBack}
                    type="button"
                    className="self-start m-5 ml-1"
                >
                    <Image
                        src={"/payment/back-icon.svg"}
                        width={24}
                        height={24}
                        alt="Boton para regresar"
                    />
                </button>
                <h1
                    className={`${poppins.className} text-[#191B23] w-full font-semibold text-base`}
                >
                    ¿Cómo te gustaría pagar?
                </h1>
            </div>
            <h2 className="font-normal text-base text-[#767676]">
                El monto será cargado a tu cuenta una vez concluido el viaje.
            </h2>
            <div className="flex justify-between bg-[#F2F2F2] p-3 rounded-xl">
                <div className="flex items-center">
                    <div>
                        <Image
                            src={
                                "/payment/add-new-payment-method/bank-icon.svg"
                            }
                            width={24}
                            height={24}
                            alt="Icono de cuenta de banco"
                        />
                    </div>
                    <div className="flex flex-col pl-[1.4rem]">
                        <h3 className="text-[#202020] text-sm font-bold">
                            Cuenta de banco
                        </h3>
                        <p className="text-xs font-normal text-[#979797]">
                            Vincula tu cuenta de banco
                        </p>
                    </div>
                </div>
                <button>
                    {" "}
                    <Image
                        src={"/payment/add-new-payment-method/right-arrow.svg"}
                        width={24}
                        height={24}
                        alt="Boton agregar nuevo banco"
                    />
                </button>
            </div>
            <div className="flex justify-between bg-[#F2F2F2] p-3 pl-0 rounded-xl">
                <div className="flex items-center ">
                    <div>
                        <Image
                            src={
                                "/payment/add-new-payment-method/paypal-icon.svg"
                            }
                            width={60}
                            height={48}
                            alt="Icono de PayPal"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className="text-[#202020] text-sm font-bold">
                            Paypal
                        </h3>
                        <p className="text-xs font-normal text-[#979797]">
                            Agrega tu cuenta
                        </p>
                    </div>
                </div>
                <button>
                    <Image
                        src={"/payment/add-new-payment-method/right-arrow.svg"}
                        width={24}
                        height={24}
                        alt="Boton agregar nuevo paypal"
                    />
                </button>
            </div>
            <div className="flex justify-between bg-[#F2F2F2] p-3 rounded-xl">
                <div className="flex items-center">
                    <div>
                        <Image
                            src={
                                "/payment/add-new-payment-method/card-icon.svg"
                            }
                            width={24}
                            height={24}
                            alt="Icono de tarjeta"
                        />
                    </div>
                    <div className="flex flex-col pl-[1.4rem]">
                        <h3 className="text-[#202020] text-sm font-bold">
                            Tajeta de Crédito o Débito
                        </h3>
                        <p className="text-xs font-normal text-[#979797]">
                            Mastercard o Visa
                        </p>
                    </div>
                </div>
                <button>
                    <Image
                        src={"/payment/add-new-payment-method/right-arrow.svg"}
                        width={24}
                        height={24}
                        alt="Boton agregar nueva tarjeta"
                    />
                </button>
            </div>
            <h2 className="text-center font-normal text-base text-[#000000]">
                Descuida, no almacenamos tu informacion de pago.
            </h2>
            <button
                onClick={handleContinue}
                alt="Continuar"
                type="button"
                className="self-center text-base font-normal text-white h-[3.25rem] rounded-lg w-[90%] bg-payment-button-gradient hover:bg-payment-button-gradient-hover transition-all duration-300"
            >
                Continuar
            </button>
        </motion.section>
    );
}
