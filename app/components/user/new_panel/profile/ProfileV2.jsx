"use client";

import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountrySelect from "@/app/components/public/main-pages/auxiliarComponents/CountrySelect";
import { useTranslations } from "next-intl";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import ChangePasswordModal from "@/app/components/lib/auth/ChangePasswordModal";

export default function ProfileV2() {
    const { state, dispatch } = useContext(Context);
    const [initialValues, setInitialValues] = useState(null);
    const t = useTranslations("user_profile_v2");
    const t_place = useTranslations("user_profile_v2.inf_per.placeholders");

    const howMetUsOptions = [
        { value: "", label: t("how_met_us_options.lb_1") },
        { value: t("how_met_us_options.vl_2"), label: t("how_met_us_options.lb_2") },
        {
            value: t("how_met_us_options.vl_2"),
            label: t("how_met_us_options.lb_2"),
        },
        { value: t("how_met_us_options.vl_3"), label: t("how_met_us_options.lb_3") },
        { value: t("how_met_us_options.vl_4"), label: t("how_met_us_options.lb_4") },
        { value: t("how_met_us_options.vl_5"), label: t("how_met_us_options.lb_5") },
    ];

    useEffect(() => {
        if (state?.user?.id) {
            const user = state.user;

            setInitialValues({
                name: user.name || "",
                lastName: user.lastName || "",
                idNum: user.idNum || "",
                phone: user.phone || "",
                emergencyPhone: user.emergencyPhone || "",
                city: user.city || "",
                email: user.email || "",
                street: user.street || "",
                streetNumber: user.streetNumber || "",
                postalCode: user.postalCode || "",
                birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
                emergencyName: user.emergencyName || "",
                emergencyEmail: user.emergencyEmail || "",
                howMetUs: user.howMetUs || "",
                destinationUniversity: user.destinationUniversity || "",
                homeUniversity: user.homeUniversity || "",
                arrivalDate: user?.arrivalDate ? new Date(user.arrivalDate).toISOString().split("T")[0] : "",
                arrivalTime: user?.arrivalTime ? user.arrivalTime : "",
                genre: user.genre || "",
                country: user.country || "",
                personalReview: user.personalReview || "",
                reasonForValencia: user.reasonForValencia || "",
                reasonForValenciaOther: user.reasonForValenciaOther || "",
            });
        }
    }, [state]);

    const handleSubmit = async (values) => {
        const toastId = toast.loading(t("responses.loading"));
        try {
            await axios.put("/api/user", { ...values, id: state?.user?.id });
            toast.success(t("responses.success"), {
                id: toastId,
            });
            await isUserLogged(dispatch);
        } catch (error) {
            console.error("Error actualizando datos:", error);
            toast.info(t("responses.loading"), { id: toastId });
        }
    };

    return (
        initialValues && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full p-6 bg-white"
            >
                <h1 className="text-xl font-semibold text-gray-800 mb-4">{t("inf_per.h1")}</h1>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({ setFieldValue, values }) => (
                        <Form>
                            {/* Nombre y Apellido */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.name")}</label>
                                <Field
                                    name="name"
                                    type="text"
                                    disabled={false}
                                    className="border-none font-semibold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.last_name")}</label>
                                <Field name="lastName" type="text" className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            {/* Email */}
                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-200 p-3 gap-2 rounded-sm">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.email")}</label>
                                <Field name="email" type="email" disabled className="border-none font-bold text-gray-500 focus:outline-none" />
                            </div>

                            {/* ID / Passport */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.id")}</label>
                                <Field name="idNum" type="text" className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            {/* Teléfono con código de país */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.phone")}</label>
                                <PhoneInput
                                    value={values.phone}
                                    onChange={(value) => setFieldValue("phone", value)}
                                    inputProps={{ required: true }}
                                    enableSearch={true}
                                    disableSearchIcon={true}
                                    international
                                    country="es"
                                    /* --- Estilos principales para el contenedor --- */
                                    containerStyle={{
                                        maxWidth: "100%",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        border: "0px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                    /* --- Estilos del input (campo de texto) --- */
                                    inputStyle={{
                                        backgroundColor: "#ffffff",
                                        width: "100%",
                                        fontSize: "16px",
                                        border: "none", // Quitamos borde para usar el del contenedor
                                        outline: "none",
                                        boxShadow: "none",
                                        padding: "8px 48px 8px 40px",
                                        color: "#111827",
                                    }}
                                    /* --- Estilos del botón (bandera) --- */
                                    buttonStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "none",
                                    }}
                                    /* --- Estilos del dropdown (lista de países) --- */
                                    dropdownStyle={{
                                        paddingRight: "8px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        textAlign: "start",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                    /* --- Estilos de la barra de búsqueda dentro del dropdown --- */
                                    searchStyle={{
                                        width: "100%",
                                        margin: 0,
                                        padding: "16px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                    }}
                                />
                            </div>

                            {/* Fecha de nacimiento*/}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.birth_date")}</label>
                                <Field name="birthDate" type="date" className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            {/* Género */}
                            <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100 bg-white">
                                <label className="text-[10px] px-3 font-semibold text-gray-600 uppercase">{t("inf_per.gender")}</label>
                                <Field
                                    as="select"
                                    name="genre"
                                    className="appearance-none px-3 w-full bg-transparent border-none font-bold text-gray-900 focus:outline-none cursor-pointer"
                                >
                                    <option value="">{t("inf_per.options.default")}</option>
                                    <option value="MALE">{t("inf_per.options.male")}</option>
                                    <option value="FEMALE">{t("inf_per.options.female")}</option>
                                    <option value="OTHER">{t("inf_per.options.other")}</option>
                                </Field>
                            </div>

                            {/* Nacionalidad */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.nationality")}</label>
                                <Field name="country">
                                    {({ field }) => (
                                        <CountrySelect
                                            value={field.value}
                                            onChange={(value) => setFieldValue("country", value)}
                                            containerCustomClass="border-none ring-0 px-0"
                                            spanCustomClass="font-semibold text-gray-900"
                                        />
                                    )}
                                </Field>
                            </div>

                            {/* Ciudad */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.city")}</label>
                                <Field name="city" placeholder={t_place("city")} className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            {/* Dirección Calle */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.address")}</label>
                                <Field
                                    name="street"
                                    placeholder={t_place("address")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            {/* Dirección Numero de calle */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.number")}</label>
                                <Field
                                    name="streetNumber"
                                    placeholder={t_place("number")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            {/* Código postal */}
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.postal_code")}</label>
                                <Field
                                    name="postalCode"
                                    placeholder={t_place("postal_code")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            {/* Contacto de emergencia */}
                            <h2 className="text-lg font-semibold text-gray-800 my-6">{t("inf_per.emergency_contact.h2")}</h2>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.emergency_contact.name")}</label>
                                <Field
                                    name="emergencyName"
                                    placeholder={t_place("emergency_name")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.emergency_contact.phone")}</label>
                                <PhoneInput
                                    value={values.emergencyPhone}
                                    onChange={(value) => setFieldValue("emergencyPhone", value)}
                                    inputProps={{ required: true }}
                                    enableSearch={true}
                                    disableSearchIcon={true}
                                    international
                                    country="es"
                                    /* --- Estilos principales para el contenedor --- */
                                    containerStyle={{
                                        maxWidth: "100%",
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        border: "0px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                    /* --- Estilos del input (campo de texto) --- */
                                    inputStyle={{
                                        backgroundColor: "#ffffff",
                                        width: "100%",
                                        fontSize: "16px",
                                        border: "none", // Quitamos borde para usar el del contenedor
                                        outline: "none",
                                        boxShadow: "none",
                                        padding: "8px 48px 8px 40px",
                                        color: "#111827",
                                    }}
                                    /* --- Estilos del botón (bandera) --- */
                                    buttonStyle={{
                                        backgroundColor: "#ffffff",
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "none",
                                    }}
                                    /* --- Estilos del dropdown (lista de países) --- */
                                    dropdownStyle={{
                                        paddingRight: "8px",
                                        backgroundColor: "#ffffff",
                                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                                        maxHeight: "150px",
                                        overflowY: "auto",
                                        textAlign: "start",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                    /* --- Estilos de la barra de búsqueda dentro del dropdown --- */
                                    searchStyle={{
                                        width: "100%",
                                        margin: 0,
                                        padding: "16px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "4px",
                                        fontSize: "16px",
                                    }}
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">{t("inf_per.emergency_contact.email")}</label>
                                <Field
                                    name="emergencyEmail"
                                    placeholder={t_place("emergency_email")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            {/* Datos Adicionales */}
                            <h2 className="text-lg font-semibold text-gray-800 my-6">{t("inf_per.additional_info.h2")}</h2>

                            {/* Razón para Valencia */}
                            <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="px-3 text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.reason")}
                                </label>
                                <Field
                                    as="select"
                                    name="reasonForValencia"
                                    className="appearance-none px-3 bg-white border-none font-bold text-gray-900 focus:outline-none"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFieldValue("reasonForValencia", value);
                                        if (value !== "Otro") {
                                            setFieldValue("reasonForValenciaOther", "");
                                        }
                                    }}
                                    value={values.reasonForValencia}
                                >
                                    <option value="">{t("inf_per.additional_info.options_1.default")}</option>
                                    <option value="Por estudios">{t("inf_per.additional_info.options_1.study")}</option>
                                    <option value="Por trabajo">{t("inf_per.additional_info.options_1.job")}</option>
                                    <option value="Soy nomada digital">{t("inf_per.additional_info.options_1.digital_nomad")}</option>
                                    <option value="Por turismo">{t("inf_per.additional_info.options_1.tourism")}</option>
                                    <option value="Aprender el idioma">{t("inf_per.additional_info.options_1.language")}</option>
                                    <option value="A vivir">{t("inf_per.additional_info.options_1.live")}</option>
                                    <option value="Otro">{t("inf_per.additional_info.options_1.other")}</option>
                                </Field>
                            </div>

                            <AnimatePresence>
                                {values.reasonForValencia === "Otro" && (
                                    <motion.div
                                        key="reason-input"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                            <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                                {t("inf_per.additional_info.tell_you_reason")}
                                            </label>
                                            <Field
                                                as="textarea"
                                                name="reasonForValenciaOther"
                                                placeholder="Comparte con nostros tus razones."
                                                className="border-none font-bold text-gray-900 focus:outline-none"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.tell_about_yourself")}
                                </label>
                                <Field
                                    name="personalReview"
                                    as="textarea"
                                    placeholder={t_place("personal_review")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="px-3 text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.how_met_us")}
                                </label>
                                <Field
                                    as="select"
                                    name="howMetUs"
                                    className="appearance-none px-3 bg-white border-none font-bold text-gray-900 focus:outline-none"
                                >
                                    {howMetUsOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.check_in_date")}
                                </label>
                                <Field name="arrivalDate" type="date" className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.check_in_hour")}
                                </label>
                                <Field name="arrivalTime" type="time" className="border-none font-bold text-gray-900 focus:outline-none" />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.origin_university")}
                                </label>
                                <Field
                                    name="homeUniversity"
                                    placeholder={t_place("home_university")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    {t("inf_per.additional_info.destiny_university")}
                                </label>
                                <Field
                                    name="destinationUniversity"
                                    placeholder={t_place("away_university")}
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-[#440cac] text-white py-3 rounded-sm font-semibold hover:bg-[#440cac]/80 transition-colors"
                            >
                                {t("inf_per.save")}
                            </button>
                        </Form>
                    )}
                </Formik>
                <ChangePasswordModal />
            </motion.div>
        )
    );
}
