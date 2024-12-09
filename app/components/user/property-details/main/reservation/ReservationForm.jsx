import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import ReservationButton from "../ReservationButton";
import { AnimatePresence, motion } from "framer-motion";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  idNum: yup.string().required("El ID/Pasaporte es requerido"),
  country: yup.string().required("El país es requerido"),
  reasonForValencia: yup.string().required("Selecciona una razón"),
  personalReview: yup.string().required("La reseña personal es requerida"),
  phone: yup.string().required("El teléfono es requerido"),
  email: yup.string().required("El correo electrónico es requerido"),
});

const ReservationForm = ({
  data,
  handleReservationSubmit,
  clausesAccepted,
  setClausesAccepted,
  isSubmitting,
}) => {
  return (
    <Formik
      initialValues={{
        name: data?.user?.name || "",
        lastName: data?.user?.lastName || "",
        idNum: data?.user?.idNum || "",
        country: data?.user?.country || "",
        reasonForValencia: data?.user?.reasonForValencia || "",
        reasonForValenciaOther: data?.user?.reasonForValenciaOther || "",
        personalReview: data?.user?.personalReview || "",
        phone: data?.user?.phone || "",
        email: data?.user?.email || "",
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
      onSubmit={(values) => handleReservationSubmit(values)}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form className="space-y-6">
          {/* Nombre y Apellido */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Nombre
              </label>
              <Field
                name="name"
                placeholder="Escribe tu nombre"
                className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-xs mt-1 ml-1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Apellido
              </label>
              <Field
                name="lastName"
                placeholder="Escribe tu apellido"
                className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="lastName"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* ID/PASSPORT */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              ID/Pasaporte
            </label>
            <Field
              name="idNum"
              placeholder="Introduce tu ID o pasaporte"
              className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
            />
            <ErrorMessage
              name="idNum"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Nacionalidad
            </label>
            <div className="">
              <div>
                <Field
                  name="country"
                  placeholder="País"
                  className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
                />
                <ErrorMessage
                  name="country"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>
          </div>

          {/* Razón para Valencia */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              ¿Por qué vienes a Valencia?
            </label>
            <Field
              as="select"
              name="reasonForValencia"
              className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
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
          </div>

          {/* Campo adicional para "Otro" */}
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
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Cuéntanos sobre tí
                </label>
                <Field
                  as="textarea"
                  name="reasonForValenciaOther"
                  placeholder="Comparte con nosotros tus intereses, pasatiempos y qué tipo de inquilino eres."
                  className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition h-24"
                />
                <ErrorMessage
                  name="reasonForValenciaOther"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Reseña personal */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Información adicional
            </label>
            <Field
              name="personalReview"
              as="textarea"
              placeholder="Dinos en que empresa trabajarás o a que universidad irás."
              className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition h-24"
            />
            <ErrorMessage
              name="personalReview"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Número de contacto
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
              containerStyle={{ maxWidth: "100%" }}
              inputStyle={{
                backgroundColor: "#f3f4f6",
                width: "100%",
              }}
              searchStyle={{
                borderColor: "#d1d5db",
              }}
            />
            <ErrorMessage
              name="phone"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Correo electrónico
            </label>
            <Field
              name="email"
              placeholder="Tu correo electrónico"
              disabled
              className="w-full p-3 rounded-lg outline-none bg-slate-50 border border-gray-300 text-sm text-gray-700"
            />
          </div>

          {/* Checkbox de términos y condiciones */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={clausesAccepted}
              onChange={() => setClausesAccepted(!clausesAccepted)}
              className="mr-2 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500">
              Acepto los{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-blue-500 underline"
              >
                términos y condiciones
              </Link>
            </p>
          </div>

          {/* Botón de reservación */}
          <ReservationButton disabled={isSubmitting} callback={handleSubmit} />
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
