"use client";

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

const ProfileProgressBar = () => {
    const { state } = useContext(Context);
    const [progress, setProgress] = useState(0);

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
                user.birthDate
                    ? new Date(user.birthDate).toISOString().split("T")[0]
                    : "",
                user.emergencyName,
                user.emergencyEmail,
                user.howMetUs,
                user.destinationUniversity,
                user.homeUniversity,
                user.arrivalDate
                    ? new Date(user.arrivalDate).toISOString().split("T")[0]
                    : "",
                user.arrivalTime,
                user.genre,
                user.country,
                user.reasonForValencia,
                user.reasonForValenciaOther,
                user.personalReview,
            ];

            const filledFields = requiredFields.filter(
                (field) => field && field.trim() !== ""
            );

            const percentage = Math.round(
                (filledFields.length / requiredFields.length) * 100
            );

            setProgress(percentage);
        }
    }, [state]);

    return (
        <div className="h-[102px] bg-[#f7f7f7] grid place-items-center w-full">
            <div className="w-full p-4 max-w-screen-xl">
                <p className="text-center text-gray-700">
                    ¡Rellena la información de tu perfil!
                </p>

                <div className="relative w-full mt-2">
                    <div className="h-2.5 bg-gray-300 w-full rounded-full"></div>
                    <motion.div
                        className="absolute top-0 left-0 h-2.5 bg-green-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ maxWidth: "100%" }}></motion.div>
                </div>

                <p className="text-center text-green-600 font-semibold mt-1">
                    {progress}% Progreso
                </p>
            </div>
        </div>
    );
};

export default ProfileProgressBar;
