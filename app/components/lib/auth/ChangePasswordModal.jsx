"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "@/app/firebase/config";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useTranslations } from "next-intl";

const ChangePasswordModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const t = useTranslations("user_profile_v2.change_password");

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("Requerido"),
            password: Yup.string().min(6, t("min_6")).required(t("required")),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], t("not_match"))
                .required(t("required")),
        }),
        onSubmit: async (values) => {
            const toastId = toast.loading(t("loading"));
            try {
                setLoading(true);
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, values.password);
                toast.success(t("success"), {
                    id: toastId,
                });
                formik.resetForm();
                setIsOpen(false);
                setIsConfirmed(false);
            } catch (error) {
                toast.error(error.code === "auth/wrong-password" || error.code === "auth/invalid-credential" ? t("wrong_password") : t("error"), {
                    id: toastId,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="w-full grid place-items-center py-4">
            <button onClick={() => setIsOpen(true)} className="text-[#440cac] underline hover:opacity-80">
                {t("verif.btn_1")}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white p-6 rounded-xl shadow-xl z-50 w-full max-w-sm"
                        >
                            <span className="text-lg font-semibold text-gray-800 mb-4 block">{t("verif.btn_1")}</span>

                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200 mb-3">{t("verif.text_1")}</div>

                            <div className="flex items-center gap-2 mb-3">
                                <input type="checkbox" id="confirmChange" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />
                                <label htmlFor="confirmChange" className="text-sm text-gray-700">
                                    {t("verif.lb_1")}
                                </label>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        placeholder={t("verif.place_1")}
                                        value={formik.values.currentPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#440cac]"
                                        disabled={!isConfirmed || loading}
                                    />
                                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                                        <p className="text-xs text-red-500 mt-1">{formik.errors.currentPassword}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder={t("verif.place_2")}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#440cac]"
                                        disabled={!isConfirmed || loading}
                                    />
                                    {formik.touched.password && formik.errors.password && (
                                        <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder={t("verif.place_3")}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#440cac]"
                                        disabled={!isConfirmed || loading}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <p className="text-xs text-red-500 mt-1">{formik.errors.confirmPassword}</p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm text-gray-500 hover:underline"
                                        disabled={loading}
                                    >
                                        {t("verif.cancel")}
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#440cac] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition"
                                        disabled={loading || !isConfirmed}
                                    >
                                        {t("verif.save")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChangePasswordModal;
