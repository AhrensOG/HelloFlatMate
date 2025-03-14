"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ReservationCard from "./auxiliarComponents/ReservationCard";
import { Context } from "@/app/context/GlobalContext";
import Link from "next/link";

const ReservationsV2 = () => {
    const { state } = useContext(Context);
    const activeReservations = state?.user?.leaseOrdersRoom || [];

    const inReviewReservations = activeReservations.filter(
        (order) =>
            order.status === "IN_PROGRESS" &&
            !order.isActive &&
            !order.isSigned &&
            order.inReview
    );

    const pendingReservations = activeReservations.filter(
        (order) =>
            order.status === "PENDING" &&
            order.isActive &&
            !order.isSigned &&
            !order.inReview
    );

    const pendingSignatureReservations = activeReservations.filter(
        (order) =>
            order.status === "APPROVED" &&
            order.isActive &&
            !order.isSigned &&
            !order.inReview
    );

    const completedReservations = activeReservations.filter(
        (order) =>
            order.status === "APPROVED" &&
            order.isActive &&
            order.isSigned &&
            !order.inReview
    );

    return (
        <div className="w-full flex flex-col items-center px-0 md:px-6 pb-10 bg-white">
            {/* Título principal */}
            <div className="w-full flex flex-col justify-start items-start">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    Todas las reservas
                </h1>
            </div>

            {pendingSignatureReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Pendiente de Firma
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-purple-100 text-purple-800 p-4 rounded-lg flex items-center gap-2">
                        <InformationCircleIcon className="w-6 h-6 text-purple-800" />
                        <p className="text-sm">
                            <strong>Tu reserva está pendiente de firma.</strong>{" "}
                            Sube la documentación y firma el contrato para
                            finalizar el proceso.
                        </p>
                    </motion.div>
                    <div className="mt-4">
                        {pendingSignatureReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                data={reservation}
                                user={state.user}
                            />
                        ))}
                    </div>
                </div>
            )}

            {pendingReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        En Progreso
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-[#5ce0e5]/15 text-[#440cac] p-4 rounded-lg flex items-center gap-2">
                        <InformationCircleIcon className="w-6 h-6 text-[#440cac]" />
                        <p className="text-sm">
                            <strong>¡Listo para dar el siguiente paso!</strong>{" "}
                            Paga tu reserva para luego continuar con los pasos restantes y avanzar en tu
                            reserva.
                        </p>
                    </motion.div>
                    <div className="mt-4">
                        {pendingReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                data={reservation}
                                user={state.user}
                            />
                        ))}
                    </div>
                </div>
            )}

            {inReviewReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        En Revisión
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-yellow-100 text-yellow-800 p-4 rounded-lg flex items-center gap-2">
                        <InformationCircleIcon className="w-6 h-6 text-yellow-800" />
                        <p className="text-sm">
                            <strong>Tu reserva está en revisión.</strong>{" "}
                            Estamos verificando tu solicitúd;
                            pronto recibirás una actualización.
                        </p>
                    </motion.div>
                    <div className="mt-4">
                        {inReviewReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                data={reservation}
                                user={state.user}
                            />
                        ))}
                    </div>
                </div>
            )}

            {completedReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Completas
                    </h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2">
                        <InformationCircleIcon className="w-6 h-6 text-green-800" />
                        <p className="text-sm">
                            <strong>¡Todo listo!</strong> Tu reserva está
                            confirmada y completa.
                        </p>
                    </motion.div>
                    <div className="mt-4">
                        {completedReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                data={reservation}
                                user={state.user}
                            />
                        ))}
                    </div>
                </div>
            )}

            {pendingReservations.length === 0 &&
                inReviewReservations.length === 0 &&
                pendingSignatureReservations.length === 0 &&
                completedReservations.length === 0 && (
                    <p className="text-gray-500 text-center text-sm mt-4">
                        No tienes reservas activas en este momento.
                    </p>
                )}

            <p className="text-gray-600 text-sm text-center mt-6">
                ¿Tienes alguna pregunta sobre el proceso de reserva?{" "}
                <Link
                    href="#"
                    className="text-[#440cac] font-semibold hover:underline">
                    Escríbenos
                </Link>{" "}
                cuando quieras.
            </p>
        </div>
    );
};

export default ReservationsV2;
