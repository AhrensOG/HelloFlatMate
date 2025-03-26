"use client";

import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Context } from "@/app/context/GlobalContext";
import ChangePasswordModal from "@/app/components/lib/auth/ChangePasswordModal";

export default function OwnerProfile() {
    const { state, dispatch } = useContext(Context);
    const [initialValues, setInitialValues] = useState(null);
    const t = useTranslations("forms.update_client");

    useEffect(() => {
        if (state?.user?.id) {
            const user = state.user;

            setInitialValues({
                name: user.name || "",
                lastName: user.lastName || "",
                email: user.email || "",
                idNum: user.idNum || "",
                IBAN: user.IBAN || "-",
            });
        }
    }, [state]);

    return (
        initialValues && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full p-6 bg-white"
            >
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Información personal
                </h1>

                <Formik initialValues={initialValues} enableReinitialize>
                    {({}) => (
                        <Form>
                            {/* Nombre y Apellido */}
                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-300 p-3 gap-2 rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Nombre
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    disabled
                                    className="border-none font-semibold text-gray-500 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-300 p-3 gap-2 rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Apellido
                                </label>
                                <Field
                                    name="lastName"
                                    type="text"
                                    disabled
                                    className="border-none font-bold text-gray-500 focus:outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-300 p-3 gap-2 rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    disabled
                                    className="border-none font-bold text-gray-500 focus:outline-none"
                                />
                            </div>

                            {/* ID / Passport */}
                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-300 p-3 gap-2 rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    ID / Passport
                                </label>
                                <Field
                                    name="idNum"
                                    type="text"
                                    disabled
                                    className="border-none font-bold text-gray-500 focus:outline-none"
                                />
                            </div>

                            {/* IBAN */}
                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-300 p-3 gap-2 rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    IBAN
                                </label>
                                <Field
                                    name="IBAN"
                                    type="text"
                                    disabled
                                    className="border-none font-bold text-gray-500 focus:outline-none"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
                <ChangePasswordModal />
            </motion.div>
        )
    );
}
