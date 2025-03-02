"use client";

import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";

const ReservationProgressBar = () => {
    const { state } = useContext(Context);
    const [progress, setProgress] = useState(0);

    return (
        <div className="h-[86px] bg-[#f7f7f7] grid place-items-center w-full px-4">
            <div className="w-full pt-4 max-w-screen-xl">
                <p className="text-center text-gray-700 font-bold">
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

export default ReservationProgressBar;
