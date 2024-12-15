import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AnimatePresence, motion } from "framer-motion";
import * as yup from "yup";
import CountrySelect from "./CountrySelect";
import { toast } from "sonner";
import axios from "axios";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  country: yup.string().required("El país es requerido"),
  reasonForValencia: yup.string().required("Selecciona una razón"),
  preferences: yup.string().required("Indícanos tus preferencias"),
  phone: yup.string().required("El teléfono es requerido"),
  email: yup.string().required("El correo es requerido"),
  birthDate: yup
    .date()
    .nullable()
    .required("La fecha de nacimiento es requerida")
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro"),
});

const RequestForm = ({ toggleModal, data, filters }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative h-auto max-h-[90%] flex flex-col justify-start items-center"
      >
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </motion.button>
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-gray-800 mb-4"
        >
          Envíanos tus datos
        </motion.h3>

        <Formik
          initialValues={{
            name: data?.name || "",
            lastName: data?.lastName || "",
            country: data?.country || "",
            reasonForValencia: data?.reasonForValencia || "",
            reasonForValenciaOther: data?.reasonForValenciaOther || "",
            preferences: "",
            phone: data?.phone || "",
            email: data?.email || "",
            birthDate: data?.birthDate
              ? new Date(data.birthDate).toISOString().split("T")[0]
              : "",
          }}
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
          onSubmit={async (values) => {
            const toastId = toast.loading("Enviando datos...");
            try {
              values.clientId = data.id;
              const allInfo = { ...values, ...filters };
              await axios.post("/api/user/searchRequest", allInfo);
              toast.success("Datos enviados con éxito", {
                id: toastId,
                description: "¡Estaremos en contacto!",
              });
              toggleModal();
            } catch (error) {
              console.error(error);
              toast.info(
                "Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.",
                { id: toastId }
              );
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-2 overflow-y-auto w-full scrollbar-none px-2 py-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex flex-col justify-center items-start sm:flex-row gap-2 text-start"
              >
                {[
                  { label: "Nombre", name: "name", placeholder: "Tu nombre" },
                  {
                    label: "Apellido",
                    name: "lastName",
                    placeholder: "Tu apellido",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.3 }}
                    className="w-full"
                  >
                    <label className="text-start block text-xs text-gray-700 mb-0.5">
                      {field.label}
                    </label>
                    <Field
                      name={field.name}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex flex-col justify-center items-start sm:flex-row gap-2 text-start"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="w-full"
                >
                  <label className="text-start block text-xs text-gray-700 mb-0.5">
                    Fecha de nacimiento
                  </label>
                  <Field
                    name="birthDate"
                    type="date"
                    placeholder="Tu fecha de nacimiento"
                    className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="w-full"
                >
                  <label className="text-start block text-xs text-gray-700 mb-0.5">
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
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-start"
              >
                <label className="text-start block text-xs text-gray-700 mb-0.5">
                  ¿Por qué vienes a Valencia?
                </label>
                <Field
                  as="select"
                  name="reasonForValencia"
                  className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none appearance-none"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="Por estudios">Por estudios</option>
                  <option value="Por trabajo">Por trabajo</option>
                  <option value="Soy nómada digital">Soy nómada digital</option>
                  <option value="Por turismo">Por turismo</option>
                  <option value="Aprender el idioma">Aprender el idioma</option>
                  <option value="A vivir">A vivir</option>
                  <option value="Otro">Otro</option>
                </Field>
                <ErrorMessage
                  name="reasonForValencia"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </motion.div>

              <AnimatePresence>
                {values.reasonForValencia === "Otro" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 text-start"
                  >
                    <label className="text-start block text-xs text-gray-700 mb-0.5">
                      Cuéntanos más
                    </label>
                    <Field
                      as="textarea"
                      name="reasonForValenciaOther"
                      placeholder="Dinos más sobre tu visita"
                      className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none h-12"
                    />
                    <ErrorMessage
                      name="reasonForValenciaOther"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-start"
              >
                <label className="text-start block text-xs text-gray-700 mb-0.5">
                  Indícanos tus preferencias
                </label>
                <Field
                  as="textarea"
                  name="preferences"
                  placeholder="Cuéntanos lo que buscas"
                  className="w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 outline-none h-12"
                />
                <ErrorMessage
                  name="preferences"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-start"
              >
                <label className="text-start block text-xs text-gray-700 mb-0.5">
                  Teléfono
                </label>
                <PhoneInput
                  inputProps={{
                    required: true,
                  }}
                  international
                  country="es"
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
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <label className="text-start block text-xs text-gray-700 mb-0.5">
                  Correo electrónico
                </label>
                <Field
                  name="email"
                  placeholder="Tu correo electrónico"
                  className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-auto"
                  disabled
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#5ce0e5] text-white text-lg font-bold py-2 px-10 rounded-lg hover:bg-[#5ce0e5] transition outline-none"
              >
                Enviar
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};

export default RequestForm;
