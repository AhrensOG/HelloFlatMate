"use client";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ReservationCard from "./auxiliarComponents/ReservationCard";
import { Context } from "@/app/context/GlobalContext";
import Link from "next/link";
import { useTranslations } from "next-intl";
import HTMLReactParser from "html-react-parser";
import { isUserLogged } from "@/app/context/actions/isUserLogged";

const ReservationsV2 = () => {
    const { state, dispatch } = useContext(Context);
    const t = useTranslations("user_profile_v2.reservations");
    const formatedStrongText = (str) => {
        return str.replace(/\(strong\)/g, "<strong>").replace(/\(\/strong\)/g, "</strong>");
    };

    useEffect(() => {
      isUserLogged(dispatch).catch((err) => {
        console.log("Error al actualizar usuario:", err);
      });
    }, [dispatch]);

    const activeReservations = state?.user?.leaseOrdersRoom || [];

    const inReviewReservations = activeReservations.filter(
        (order) => order.status === "IN_PROGRESS" && !order.isActive && !order.isSigned && order.inReview
    );

    const pendingReservations = activeReservations.filter(
        (order) => order.status === "PENDING" && order.isActive && !order.isSigned && !order.inReview
    );

    const pendingSignatureReservations = activeReservations.filter(
        (order) => order.status === "APPROVED" && order.isActive && !order.isSigned && !order.inReview
    );

    const completedReservations = activeReservations.filter(
        (order) => order.status === "APPROVED" && order.isActive && order.isSigned && !order.inReview
    );

    return (
        <div className="w-full flex flex-col items-center px-0 md:px-6 pb-10 bg-white">
            {/* Título principal */}
            <div className="w-full flex flex-col justify-start items-start">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">{t("title")}</h1>
            </div>

            {pendingSignatureReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("pending_sign")}</h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-purple-100 text-purple-800 p-4 rounded-lg flex items-center gap-2"
                    >
                        <InformationCircleIcon className="w-6 h-6 text-purple-800" />
                        <p className="text-sm">{HTMLReactParser(formatedStrongText(t("p_1")))}</p>
                    </motion.div>
                    <div className="mt-4">
                        {pendingSignatureReservations.map((reservation) => (
                            <ReservationCard key={reservation.id} data={reservation} user={state.user} />
                        ))}
                    </div>
                </div>
            )}

            {pendingReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("in_progress")}</h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-[#5ce0e5]/15 text-[#440cac] p-4 rounded-lg flex items-center gap-2"
                    >
                        <InformationCircleIcon className="w-6 h-6 text-[#440cac]" />
                        <p className="text-sm">{HTMLReactParser(formatedStrongText(t("p_2")))}</p>
                    </motion.div>
                    <div className="mt-4">
                        {pendingReservations.map((reservation) => (
                            <ReservationCard key={reservation.id} data={reservation} user={state.user} />
                        ))}
                    </div>
                </div>
            )}

            {inReviewReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("in_review")}</h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-yellow-100 text-yellow-800 p-4 rounded-lg flex items-center gap-2"
                    >
                        <InformationCircleIcon className="w-6 h-6 text-yellow-800" />
                        <p className="text-sm">{HTMLReactParser(formatedStrongText(t("p_3")))}</p>
                    </motion.div>
                    <div className="mt-4">
                        {inReviewReservations.map((reservation) => (
                            <ReservationCard key={reservation.id} data={reservation} user={state.user} />
                        ))}
                    </div>
                </div>
            )}

            {completedReservations.length > 0 && (
                <div className="w-full max-w-screen-lg mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">{t("completed")}</h2>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-green-100 text-green-800 p-4 rounded-lg flex items-center gap-2"
                    >
                        <InformationCircleIcon className="w-6 h-6 text-green-800" />
                        <p className="text-sm">{HTMLReactParser(formatedStrongText(t("p_4")))}</p>
                    </motion.div>
                    <div className="mt-4">
                        {completedReservations.map((reservation) => (
                            <ReservationCard key={reservation.id} data={reservation} user={state.user} />
                        ))}
                    </div>
                </div>
            )}

            {pendingReservations.length === 0 &&
                inReviewReservations.length === 0 &&
                pendingSignatureReservations.length === 0 &&
                completedReservations.length === 0 && <p className="text-gray-500 text-center text-sm mt-4">{t("no_reservations")}</p>}

            <p className="text-gray-600 text-sm text-center mt-6">
                {t("question")}{" "}
                <Link href="#" className="text-[#440cac] font-semibold hover:underline">
                    {t("write_us")}
                </Link>{" "}
                {t("write_us_1")}
            </p>
        </div>
    );
};

export default ReservationsV2;
