"use client";

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import { useTranslations } from "next-intl";

const ProfileProgressBar = () => {
    const { state } = useContext(Context);
    const [progress, setProgress] = useState(0);
    const t = useTranslations("user_profile_v2.progress_bar");

    useEffect(() => {
        if (state?.user) {
            const user = state.user;

            const requiredFields = [
                user.name,
                user.lastName,
                user.idNum,
                user.phone,
                user.emergencyPhone,
                user.city,
                user.email,
                user.street,
                user.streetNumber,
                user.postalCode,
                user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
                user.emergencyName,
                user.emergencyEmail,
                user.howMetUs,
                user.destinationUniversity,
                user.homeUniversity,
                user.arrivalDate ? new Date(user.arrivalDate).toISOString().split("T")[0] : "",
                user.arrivalTime,
                user.genre,
                user.country,
                user.reasonForValencia,
                user.personalReview,
            ];

            const filledFields = requiredFields.filter((field) => field && field.trim() !== "");

            const percentage = Math.round((filledFields.length / requiredFields.length) * 100);

            setProgress(percentage);
        }
    }, [state]);

    return (
        <div className="h-[86px] bg-[#f7f7f7] grid place-items-center w-full px-4">
            <div className="w-full pt-4 max-w-screen-xl">
                <p className="text-center text-gray-700 font-bold">{t("p_1")}</p>

                <div className="relative w-full mt-2">
                    <div className="h-2.5 bg-gray-300 w-full rounded-full"></div>
                    <motion.div
                        className="absolute top-0 left-0 h-2.5 bg-green-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ maxWidth: "100%" }}
                    ></motion.div>
                </div>

                <p className="text-center text-green-600 font-semibold mt-1">
                    {progress}% {t("p_2")}
                </p>
            </div>
        </div>
    );
};

export default ProfileProgressBar;
