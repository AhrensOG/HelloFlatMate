"use client";

import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountrySelect from "@/app/components/public/main-pages/auxiliarComponents/CountrySelect";
import { useTranslations } from "next-intl";

// 📌 Validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  lastName: Yup.string().required("El apellido es obligatorio"),
  idNum: Yup.string().required("El DNI es obligatorio"),
  phone: Yup.string().required("El teléfono es obligatorio"),
  emergencyPhone: Yup.string().required(
    "El teléfono de emergencia es obligatorio"
  ),
  city: Yup.string().required("La ciudad es obligatoria"),
  street: Yup.string().required("La calle es obligatoria"),
  streetNumber: Yup.string().required("El número de calle es obligatorio"),
  postalCode: Yup.string().required("El código postal es obligatorio"),
  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  emergencyName: Yup.string().required(
    "El nombre de emergencia es obligatorio"
  ),
  emergencyEmail: Yup.string()
    .email("Debe ser un email válido")
    .required("El email de emergencia es obligatorio"),
  birthDate: Yup.date().required("La fecha de nacimiento es obligatoria"),
  arrivalDate: Yup.date().required("La fecha de llegada es obligatoria"),
  arrivalTime: Yup.string().required("La hora de llegada es obligatoria"),
  genre: Yup.string().required("El género es obligatorio"),
  howMetUs: Yup.string().required("Este campo es obligatorio"),
  country: Yup.string().required("La nacionalidad es obligatoria"),
});

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

const formFields = [
  { name: "email", placeholder: "Email", type: "email", disabled: true },
  { name: "name", placeholder: "Nombre", type: "text" },
  { name: "lastName", placeholder: "Apellido", type: "text" },
  { name: "idNum", placeholder: "ID / Passport", type: "text" },
  { name: "city", placeholder: "Ciudad", type: "text" },
  { name: "street", placeholder: "Calle", type: "text" },
  { name: "streetNumber", placeholder: "Número", type: "text" },
  { name: "postalCode", placeholder: "Código Postal", type: "text" },
];

export default function UpdateClient() {
  const { state } = useContext(Context);
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();
  const t = useTranslations("forms.update_client");


  useEffect(() => {
    if (state?.user?.id) {
      const user = state?.user;

      // Validar y parsear birthDate
      const readableBirthDate = user?.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "";

      // Validar y parsear arrivalDate
      const readableArrivalDate = user?.arrivalDate
        ? new Date(user.arrivalDate).toISOString().split("T")[0]
        : "";

      // Validar arrivalTime
      const readableArrivalTime = user?.arrivalTime ? user.arrivalTime : "";

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
        birthDate: readableBirthDate,
        emergencyName: user.emergencyName || "",
        emergencyEmail: user.emergencyEmail || "",
        howMetUs: user.howMetUs || "",
        destinationUniversity: user.destinationUniversity || "",
        homeUniversity: user.homeUniversity || "",
        arrivalDate: readableArrivalDate,
        arrivalTime: readableArrivalTime,
        genre: user.genre || "",
        country: user.country || "",
      });
    }
  }, [state]);

  const handleSubmit = async (values) => {
    try {
      await axios.put("/api/user", { ...values, id: state?.user?.id });
      toast.success("Información actualizada correctamente");
      router.push("/pages/user/profile");
    } catch (error) {
      console.error("Error actualizando datos:", error);
      toast.error("Error al actualizar la información");
    }
  };

  return (
    initialValues && (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-center text-2xl font-bold mb-6">
          Actualizar Información
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-6">
              {/* 🔹 Sección 1: Información del Usuario */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Información del Usuario
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-600">
                        {field.placeholder}
                      </label>
                      <Field
                        name={field.name}
                        type={field.type}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Nacionalidad
                    </label>
                    <Field name="country">
                      {({ field }) => (
                        <CountrySelect
                          value={field.value}
                          onChange={(value) => setFieldValue("country", value)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name={"country"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Fecha de nacimiento
                    </label>
                    <Field
                      name="birthDate"
                      type="date"
                      placeholder="Fecha Nac."
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"birthDate"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Teléfono
                    </label>
                    <PhoneInput
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value)}
                      inputProps={{
                        required: true,
                      }}
                      international
                      country="es"
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
                    <ErrorMessage
                      name={"phone"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Género
                    </label>
                    <Field
                      as="select"
                      name="genre"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="MALE">Masculino</option>
                      <option value="FEMALE">Femenino</option>
                      <option value="OTHER">Otro</option>
                    </Field>
                    <ErrorMessage
                      name={"genre"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* 🔹 Sección 2: Contacto de Emergencia */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Contacto de Emergencia
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Contácto de emergencia
                    </label>
                    <Field
                      name="emergencyName"
                      placeholder="Nombre emergencia"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"emergencyName"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Teléfono de emergencia
                    </label>
                    <PhoneInput
                      value={values.emergencyPhone}
                      onChange={(value) =>
                        setFieldValue("emergencyPhone", value)
                      }
                      inputProps={{
                        required: true,
                      }}
                      international
                      country="es"
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
                    <ErrorMessage
                      name={"emergencyPhone"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Email de emergencia
                    </label>
                    <Field
                      name="emergencyEmail"
                      placeholder="Email emergencia"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"emergencyEmail"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </section>

              {/* 🔹 Sección 3: Datos Adicionales */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Datos Adicionales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      ¿Cómo nos conociste?
                    </label>
                    <Field
                      as="select"
                      name="howMetUs"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    >
                      {howMetUsOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name={"howMetUs"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Fecha de check-in
                    </label>
                    <Field
                      name="arrivalDate"
                      type="date"
                      placeholder="Fecha llegada"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"arrivalDate"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Hora de check-in
                    </label>
                    <Field
                      name="arrivalTime"
                      type="time"
                      placeholder="Hora llegada"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"arrivalTime"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Universidad de origen
                    </label>
                    <Field
                      name="homeUniversity"
                      placeholder="Universidad de origen"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"homeUniversity"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">
                      Universidad de destino
                    </label>
                    <Field
                      name="destinationUniversity"
                      placeholder="Universidad de destino"
                      className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name={"destinationUniversity"}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </Form>
          )}
        </Formik>
      </motion.main>
    )
  );
}
