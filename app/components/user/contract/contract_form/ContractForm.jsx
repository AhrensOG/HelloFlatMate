"use client";

import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
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
      const readableDate = new Date(user?.birthDate)
        .toISOString()
        .split("T")[0];
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
        birthDate: readableDate,
        emergencyName: user.emergencyName || "",
        emergencyPhone: user.emergencyPhone || "",
        emergencyEmail: user.emergencyEmail || "",
      });
    }
  }, [state]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    idNum: Yup.string().required("ID/Passport es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    birthDate: Yup.date()
      .required("Fecha de nacimiento es requerida")
      .test("age", "Debes ser mayor de 18", (value) => {
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        return age >= 18;
      }),
    country: Yup.string().required("Nacionalidad es requerida"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    emergencyName: Yup.string().required("Nombre de emergencia es requerido"),
    emergencyPhone: Yup.string().required(
      "Teléfono de emergencia es requerido"
    ),
    emergencyEmail: Yup.string()
      .email("Email inválido")
      .required("Email de emergencia es requerido"),
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
    { name: "email", label: "Email", type: "email" },
  ];

  const emergencyFields = [
    { name: "emergencyName", label: "Nombre de emergencia", type: "text" },
    { name: "emergencyEmail", label: "Email de emergencia", type: "email" },
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
