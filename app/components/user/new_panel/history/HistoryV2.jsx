"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Context } from "@/app/context/GlobalContext";
import Link from "next/link";
import ReservationCard from "../reservations/auxiliarComponents/ReservationCard";

const HistoryV2 = () => {
    const { state } = useContext(Context);

    // Filtrar reservas finalizadas
    const finishedReservations =
        state?.user?.leaseOrdersRoom?.filter(
            (order) => order.status === "FINISHED"
        ) || [];

    return (
        <div className="w-full flex flex-col items-center px-0 md:px-6 pb-10 bg-white">
            {/* Título principal */}
            <div className="w-full flex flex-col justify-start items-start">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    Reservas Finalizadas
                </h1>
            </div>

            {finishedReservations.length > 0 ? (
                <div className="w-full max-w-screen-lg mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2">
                        <InformationCircleIcon className="w-6 h-6 text-green-800" />
                        <p className="text-sm">
                            Tus reservas finalizadas se muestran a continuación.
                        </p>
                    </motion.div>
                    <div className="mt-4 space-y-4">
                        {finishedReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                data={reservation}
                                user={state.user}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center text-sm mt-4">
                    No tienes reservas finalizadas en este momento.
                </p>
            )}

            <p className="text-gray-600 text-sm text-center mt-6">
                ¿Necesitas ayuda con tu historial?{" "}
                <Link
                    href="#"
                    className="text-[#440cac] font-semibold hover:underline">
                    Contáctanos
                </Link>
                .
            </p>
        </div>
    );
};

export default HistoryV2;
