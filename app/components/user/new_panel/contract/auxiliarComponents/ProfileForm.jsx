"use client";

import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountrySelect from "@/app/components/public/main-pages/auxiliarComponents/CountrySelect";
import { useTranslations } from "next-intl";
import { isUserLogged } from "@/app/context/actions/isUserLogged";

const howMetUsOptions = [
    { value: "", label: "Seleccione una opción" },
    { value: "Recomendado por amigos", label: "Recomendado por amigos" },
    {
        value: "Recomendado por la Universidad",
        label: "Recomendado por la Universidad",
    },
    { value: "Página web helloflatmate", label: "Página web helloflatmate" },
    { value: "Idealista", label: "Idealista" },
    { value: "Otros portales web", label: "Otros portales web" },
];

export default function ProfileForm() {
    const { state, dispatch } = useContext(Context);
    const [initialValues, setInitialValues] = useState(null);
    const router = useRouter();
    const t = useTranslations("forms.update_client");

    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

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
                birthDate: user?.birthDate
                    ? new Date(user.birthDate).toISOString().split("T")[0]
                    : "",
                emergencyName: user.emergencyName || "",
                emergencyEmail: user.emergencyEmail || "",
                howMetUs: user.howMetUs || "",
                destinationUniversity: user.destinationUniversity || "",
                homeUniversity: user.homeUniversity || "",
                // arrivalDate: user?.arrivalDate ? new Date(user.arrivalDate).toISOString().split("T")[0] : "",
                // arrivalTime: user?.arrivalTime ? user.arrivalTime : "",
                genre: user.genre || "",
                country: user.country || "",
                personalReview: user.personalReview || "",
                // reasonForValencia: user.reasonForValencia || "",
                // reasonForValenciaOther: user.reasonForValenciaOther || "-",
            });
        }
    }, [state]);

    const handleSubmit = async (values) => {
        const toastId = toast.loading("Guardando...");

        const missingFields = Object.entries(values).filter(
            ([key, value]) =>
                value === null ||
                value === undefined ||
                value === "" ||
                (typeof value === "string" && value.trim() === "")
        );
        
        if (missingFields.length > 0) {
            toast.info(
                "Todos los campos son obligatorios. Por favor, completalos.",
                {
                    id: toastId,
                }
            );
            return;
        }

        try {
            await axios.put("/api/user", { ...values, id: state?.user?.id });
            await isUserLogged(dispatch);

            toast.success("Información actualizada correctamente", {
                id: toastId,
                description: "¡Serás redirigido al siguiente paso!",
            });

            router.push(`/pages/user/contractv2/docs?${queryString}`);
        } catch (error) {
            console.error("Error actualizando datos:", error);
            toast.info("Error al actualizar la información", {
                id: toastId,
                description: "Intenta nuevamente o contacta a nuestro soporte.",
            });
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
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Información personal
                </h1>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Nombre
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    disabled={false}
                                    className="border-none font-semibold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Apellido
                                </label>
                                <Field
                                    name="lastName"
                                    type="text"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border bg-gray-100 border-gray-200 p-3 gap-2 rounded-sm">
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

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    ID / Passport
                                </label>
                                <Field
                                    name="idNum"
                                    type="text"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Teléfono (con código de país)
                                </label>
                                <PhoneInput
                                    value={values.phone}
                                    onChange={(value) =>
                                        setFieldValue("phone", value)
                                    }
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
                                        boxShadow:
                                            "2px 4px 8px rgba(0, 0, 0, 0.1)",
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
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Fecha de nacimiento
                                </label>
                                <Field
                                    name="birthDate"
                                    type="date"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100 bg-white">
                                <label className="text-[10px] px-3 font-semibold text-gray-600 uppercase">
                                    Género
                                </label>
                                <Field
                                    as="select"
                                    name="genre"
                                    className="appearance-none px-3 w-full bg-transparent border-none font-bold text-gray-900 focus:outline-none cursor-pointer"
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>
                                    <option value="MALE">Hombre</option>
                                    <option value="FEMALE">Mujer</option>
                                    <option value="OTHER">Otro</option>
                                </Field>
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Nacionalidad
                                </label>
                                <Field name="country">
                                    {({ field }) => (
                                        <CountrySelect
                                            value={field.value}
                                            onChange={(value) =>
                                                setFieldValue("country", value)
                                            }
                                            containerCustomClass="border-none ring-0 px-0"
                                            spanCustomClass="font-semibold text-gray-900"
                                        />
                                    )}
                                </Field>
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Ciudad
                                </label>
                                <Field
                                    name="city"
                                    placeholder="Ciudad de tu vivienda habitual"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Dirección (calle)
                                </label>
                                <Field
                                    name="street"
                                    placeholder="Dirección de tu vivienda habitual"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Número de dirección
                                </label>
                                <Field
                                    name="streetNumber"
                                    placeholder="Ej: 99"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Postal Code
                                </label>
                                <Field
                                    name="postalCode"
                                    placeholder="Ej: 46022"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-800 my-6">
                                Contacto de emergencia
                            </h2>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Nombre de emergencia
                                </label>
                                <Field
                                    name="emergencyName"
                                    placeholder="Nombre emergencia"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Teléfono de emergencia
                                </label>
                                <PhoneInput
                                    value={values.emergencyPhone}
                                    onChange={(value) =>
                                        setFieldValue("emergencyPhone", value)
                                    }
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
                                        boxShadow:
                                            "2px 4px 8px rgba(0, 0, 0, 0.1)",
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
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Email de emergencia
                                </label>
                                <Field
                                    name="emergencyEmail"
                                    placeholder="Email emergencia"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-800 my-6">
                                Datos Adicionales
                            </h2>

                            {/* <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="px-3 text-[10px] font-semibold text-gray-600 uppercase">
                                    ¿Por qué vienes a Valencia?
                                </label>
                                <Field
                                    as="select"
                                    name="reasonForValencia"
                                    className="appearance-none px-3 bg-white border-none font-bold text-gray-900 focus:outline-none"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFieldValue(
                                            "reasonForValencia",
                                            value
                                        );
                                        if (value !== "Otro") {
                                            setFieldValue(
                                                "reasonForValenciaOther",
                                                ""
                                            );
                                        }
                                    }}
                                    value={values.reasonForValencia}
                                >
                                    <option value="">
                                        Selecciona una opción
                                    </option>
                                    <option value="Por estudios">
                                        Por estudios
                                    </option>
                                    <option value="Por trabajo">
                                        Por trabajo
                                    </option>
                                    <option value="Soy nomada digital">
                                        Soy nomada digital
                                    </option>
                                    <option value="Por turismo">
                                        Por turismo
                                    </option>
                                    <option value="Aprender el idioma">
                                        Aprender el idioma
                                    </option>
                                    <option value="A vivir">A vivir</option>
                                    <option value="Otro">Otro</option>
                                </Field>
                            </div> */}

                            {/* <AnimatePresence>
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
                                                Cuéntanos tu razón
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
                            </AnimatePresence> */}

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Cúentanos sobre ti
                                </label>
                                <Field
                                    name="personalReview"
                                    as="textarea"
                                    placeholder="Comparte con nosotros tus intereses, pasatiempos y qué tipo de inquilino eres."
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 py-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="px-3 text-[10px] font-semibold text-gray-600 uppercase">
                                    ¿Cómo nos conociste?
                                </label>
                                <Field
                                    as="select"
                                    name="howMetUs"
                                    className="appearance-none px-3 bg-white border-none font-bold text-gray-900 focus:outline-none"
                                >
                                    {howMetUsOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            {/* <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Fecha de check-in
                                </label>
                                <Field
                                    name="arrivalDate"
                                    type="date"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Hora de check-in
                                </label>
                                <Field
                                    name="arrivalTime"
                                    type="time"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div> */}

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Universidad de origen
                                </label>
                                <Field
                                    name="homeUniversity"
                                    placeholder="Ej: Universidad de tu país"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <div className="mb-6 flex flex-col border border-gray-300 p-3 gap-2 hover:border-black rounded-md shadow-sm shadow-gray-100">
                                <label className="text-[10px] font-semibold text-gray-600 uppercase">
                                    Universidad de destino
                                </label>
                                <Field
                                    name="destinationUniversity"
                                    placeholder="Ej: Universidad de Valencia"
                                    className="border-none font-bold text-gray-900 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-[#440cac] text-white py-3 rounded-sm font-semibold hover:bg-[#440cac]/80 transition-colors"
                            >
                                Guardar y continuar
                            </button>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        )
    );
}
