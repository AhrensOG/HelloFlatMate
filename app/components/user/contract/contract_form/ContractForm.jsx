"use client";

import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Context } from "@/app/context/GlobalContext";
import { saveUserContractInformation } from "@/app/context/actions";
import axios from "axios";
import CountrySelect from "@/app/components/public/main-pages/auxiliarComponents/CountrySelect";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContractForm = ({ handleContinue }) => {
  const { state, dispatch } = useContext(Context);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const user = state?.user;
    if (user?.id) {
      const readableBirthDate = user?.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "";

      const readableArrivalDate = user?.arrivalDate
        ? new Date(user.arrivalDate).toISOString().split("T")[0]
        : "";
      const readableArrivalTime = user?.arrivalTime ? user.arrivalTime : "";

      setInitialValues({
        name: user.name || "",
        lastName: user.lastName || "",
        idNum: user.idNum || "",
        phone: user.phone || "",
        city: user.city || "",
        email: user.email || "",
        street: user.street || "",
        streetNumber: user.streetNumber || "",
        postalCode: user.postalCode || "",
        country: user.country || "",
        genre: user.genre || "MALE",
        birthDate: readableBirthDate,
        emergencyName: user.emergencyName || "",
        emergencyPhone: user.emergencyPhone || "",
        emergencyEmail: user.emergencyEmail || "",
        howMetUs: user.howMetUs || "",
        destinationUniversity: user.destinationUniversity || "",
        homeUniversity: user.homeUniversity || "",
        arrivalDate: readableArrivalDate,
        arrivalTime: readableArrivalTime,
        reasonForValencia: user.reasonForValencia || "",
        reasonForValenciaOther: user.reasonForValenciaOther || "",
        personalReview: user.personalReview || "",
      });
    }
  }, [state]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    idNum: Yup.string().trim("ID/Passport no puede estar vacio").strict(true).required("ID/Passport es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    city: Yup.string().required("Ciudad es requerida"),
    street: Yup.string().required("Calle es requerida"),
    streetNumber: Yup.string().required("Número de calle es requerido"),
    postalCode: Yup.string().required("Código postal es requerido"),
    country: Yup.string().required("Nacionalidad es requerida"),
    genre: Yup.string()
      .oneOf(["MALE", "FEMALE", "OTHER"], "Género inválido")
      .required("Género es requerido"),
    birthDate: Yup.date()
      .required("Fecha de nacimiento es requerida")
      .test("age", "Debes ser mayor de 18", (value) => {
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age >= 18;
      }),
    emergencyName: Yup.string().required("Nombre de emergencia es requerido"),
    emergencyPhone: Yup.string().required(
      "Teléfono de emergencia es requerido"
    ),
    emergencyEmail: Yup.string()
      .email("Email inválido")
      .required("Email de emergencia es requerido"),
    howMetUs: Yup.string().required("¿Cómo nos conociste? es requerido"),
    destinationUniversity: Yup.string().required(
      "Universidad de destino es requerida"
    ),
    homeUniversity: Yup.string().required("Universidad de origen es requerida"),
    arrivalDate: Yup.date().required("Fecha de llegada es requerida"),
    arrivalTime: Yup.string().required("Hora de llegada es requerida"),
    reasonForValencia: Yup.string().required("La razón es requerida"),
    personalReview: Yup.string().required("Tu review personal es requerida"),
  });

  const fields = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "idNum", label: "ID / Passport", type: "text" },
    { name: "birthDate", label: "Fecha de Nacimiento", type: "date" },
    { name: "city", label: "Ciudad", type: "text" },
    { name: "street", label: "Calle", type: "text" },
    { name: "streetNumber", label: "Número", type: "text" },
    { name: "postalCode", label: "Código Postal", type: "text" },
    { name: "email", label: "Email", type: "email", disabled: true },
  ];

  const emergencyFields = [
    { name: "emergencyName", label: "Nombre de emergencia", type: "text" },
    { name: "emergencyEmail", label: "Email de emergencia", type: "email" },
  ];

  // 📌 Opciones para el campo howMetUs
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

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Guardando informacion...");
    try {
      const updatedData = { ...values, id: state?.user?.id };
      await axios.put("/api/user", updatedData);
      saveUserContractInformation(dispatch, updatedData);
      toast.success("Información guardada", { id: toastId });
      handleContinue();
    } catch (error) {
      toast.info("Error al guardar información", { id: toastId });
    }
  };

  return (
    initialValues && (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-8"
      >
        <h1 className="text-center font-bold text-3xl text-gray-800">
          Contrato de Alojamiento
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validate={(values) => {
            const errors = {};
            if (
              values.reasonForValencia === "Otro" &&
              !values.reasonForValenciaOther
            ) {
              errors.reasonForValenciaOther = "Indícanos un poco más";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              {/* Información Personal */}
              <h2 className="w-full text-center text-xl pb-2">
                Información personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-gray-600"
                    >
                      {field.label}
                    </label>
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      disabled={field.disabled ? true : false}
                      className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                    />
                    {errors[field.name] && touched[field.name] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}

                {/* Campo PhoneInput */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Teléfono
                  </label>
                  <PhoneInput
                    international
                    country="ES"
                    value={values.phone}
                    onChange={(value) => setFieldValue("phone", value)}
                    className="w-full rounded-lg"
                    containerStyle={{
                      maxWidth: "100%",
                      position: "relative",
                    }}
                    inputStyle={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                    }}
                    dropdownStyle={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      maxHeight: "100px",
                      overflowY: "auto",
                      textAlign: "start",
                    }}
                  />
                  {errors.phone && touched.phone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-gray-600"
                  >
                    Nacionalidad
                  </label>
                  <Field name="country">
                    {({ field, form }) => (
                      <CountrySelect
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue("country", value)
                        }
                      />
                    )}
                  </Field>
                  {errors.country && touched.country && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Género
                  </label>
                  <Field
                    as="select"
                    id="genre"
                    name="genre"
                    className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="MALE">Masculino</option>
                    <option value="FEMALE">Femenino</option>
                    <option value="OTHER">Otro</option>
                  </Field>
                  {errors.genre && touched.genre && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.genre}
                    </span>
                  )}
                </div>
              </div>

              {/* Contacto de Emergencia */}
              <h2 className="w-full text-center text-xl pb-2 py-10">
                Contacto de emergencia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyFields.map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-gray-600"
                    >
                      {field.label}
                    </label>
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                    />
                    {errors[field.name] && touched[field.name] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Teléfono de emergencia
                  </label>
                  <PhoneInput
                    international
                    country="ES"
                    value={values.emergencyPhone}
                    onChange={(value) => setFieldValue("emergencyPhone", value)}
                    className="w-full rounded-lg"
                    containerStyle={{
                      maxWidth: "100%",
                      position: "relative",
                    }}
                    inputStyle={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                    }}
                    dropdownStyle={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      maxHeight: "100px",
                      overflowY: "auto",
                      textAlign: "start",
                    }}
                  />
                  {errors.emergencyPhone && touched.emergencyPhone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.emergencyPhone}
                    </span>
                  )}
                </div>
              </div>

              {/* 🔹 Sección 3: Datos Adicionales */}
              <h2 className="w-full text-center text-xl pb-2 py-10">
                Datos adicionales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Información adicional
                  </label>
                  <Field
                    id="personalReview"
                    name="personalReview"
                    type="text"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  />
                  {errors.personalReview && touched.personalReview && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.personalReview}
                    </span>
                  )}
                </div>
                {/* Razón para Valencia */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    ¿Por qué vienes a Valencia?
                  </label>
                  <Field
                    as="select"
                    name="reasonForValencia"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("reasonForValencia", value);
                      if (value !== "Otro") {
                        setFieldValue("reasonForValenciaOther", ""); // Resetea el campo "Otro"
                      }
                    }}
                    value={values.reasonForValencia}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Por estudios">Por estudios</option>
                    <option value="Por trabajo">Por trabajo</option>
                    <option value="Soy nomada digital">
                      Soy nomada digital
                    </option>
                    <option value="Por turismo">Por turismo</option>
                    <option value="Aprender el idioma">
                      Aprender el idioma
                    </option>
                    <option value="A vivir">A vivir</option>
                    <option value="Otro">Otro</option>
                  </Field>
                  {errors.reasonForValencia && touched.reasonForValencia && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.reasonForValencia}
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {values.reasonForValencia === "Otro" && (
                    <motion.div
                      key="reason-input"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className=""
                    >
                      <label className="text-sm font-medium text-gray-600">
                        Cuéntanos sobre tí
                      </label>
                      <Field
                        as="textarea"
                        name="reasonForValenciaOther"
                        placeholder="Comparte con nosotros tus intereses, pasatiempos y qué tipo de inquilino eres."
                        className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition h-24"
                      />
                      <ErrorMessage
                        name="reasonForValenciaOther"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    ¿Cómo nos conociste?
                  </label>
                  <Field
                    as="select"
                    name="howMetUs"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  >
                    {howMetUsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  {errors.howMetUs && touched.howMetUs && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.howMetUs}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Fecha de check-in
                  </label>
                  <Field
                    name="arrivalDate"
                    type="date"
                    placeholder="Fecha llegada"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  />
                  {errors.arrivalDate && touched.arrivalDate && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.arrivalDate}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Hora de check-in
                  </label>
                  <Field
                    name="arrivalTime"
                    type="time"
                    placeholder="Hora llegada"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  />
                  {errors.arrivalTime && touched.arrivalTime && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.arrivalTime}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Universidad de origen
                  </label>
                  <Field
                    name="homeUniversity"
                    placeholder="Universidad de origen"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  />
                  {errors.homeUniversity && touched.homeUniversity && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.emergencyPhone}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600">
                    Universidad de destino
                  </label>
                  <Field
                    name="destinationUniversity"
                    placeholder="Universidad de destino"
                    className="mt-1 p-2 border rounded-lg focus:ring-1 focus:ring-blue-300 focus:outline-none drop-shadow-sm transition"
                  />
                  {errors.destinationUniversity && touched.emergencyPhone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.emergencyPhone}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-resolution-blue text-white py-2 px-10 rounded-lg transition-shadow shadow-md hover:shadow-lg"
                >
                  Continuar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </motion.section>
    )
  );
};

export default ContractForm;
