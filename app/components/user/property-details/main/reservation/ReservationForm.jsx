import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import ReservationButton from "../ReservationButton";
import { AnimatePresence, motion } from "framer-motion";
import CountrySelect from "@/app/components/public/main-pages/auxiliarComponents/CountrySelect";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  idNum: yup.string().required("El ID/Pasaporte es requerido"),
  country: yup.string().required("El país es requerido"),
  reasonForValencia: yup.string().required("Selecciona una razón"),
  personalReview: yup.string().required("La reseña personal es requerida"),
  phone: yup.string().required("El teléfono es requerido"),
  email: yup.string().required("El correo electrónico es requerido"),
  birthDate: yup
    .date()
    .nullable()
    .required("La fecha de nacimiento es requerida")
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro"),
});

const ReservationForm = ({
  data,
  handleReservationSubmit,
  privacyWithAds,
  setPrivacyWithAds,
  privacyWithoutAds,
  setPrivacyWithoutAds,
  contractClausesConfirmed,
  setContractClausesConfirmed,
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
        birthDate: data?.user?.birthDate
          ? new Date(data?.user?.birthDate).toISOString().split("T")[0]
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
      onSubmit={(values) => handleReservationSubmit(values)}>
      {({ handleSubmit, setFieldValue, values }) => (
        <Form className="space-y-6 w-full px-1">
          {/* Nombre y Apellido */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Nombre
              </label>
              <Field
                name="name"
                placeholder="Escribe tu nombre"
                className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition"
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
                className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition"
              />
              <ErrorMessage
                name="lastName"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* ID/PASSPORT */}
          <div className="w-full flex flex-col justify-center items-center sm:flex-row gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                ID/Pasaporte
              </label>
              <Field
                name="idNum"
                placeholder="Introduce tu ID o pasaporte"
                className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition"
              />
              <ErrorMessage
                name="idNum"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Fecha de nacimiento
              </label>
              <Field
                name="birthDate"
                type="date"
                placeholder="Tu fecha de nacimiento"
                className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition"
              />
              <ErrorMessage
                name="birthDate"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Nacionalidad
            </label>
            <div className="">
              <div>
                <Field name="country">
                  {({ field, form }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={(value) => form.setFieldValue("country", value)}
                    />
                  )}
                </Field>
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
              className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition"
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("reasonForValencia", value);
                if (value !== "Otro") {
                  setFieldValue("reasonForValenciaOther", ""); // Resetea el campo "Otro"
                }
              }}
              value={values.reasonForValencia}>
              <option value="">Selecciona una opción</option>
              <option value="Por estudios">Por estudios</option>
              <option value="Por trabajo">Por trabajo</option>
              <option value="Soy nomada digital">Soy nomada digital</option>
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
                className="">
                <label className="block text-sm font-medium text-gray-500 mb-2">
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
          {/* Reseña personal */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">
              Información adicional
            </label>
            <Field
              name="personalReview"
              as="textarea"
              placeholder="Dinos en que empresa trabajarás o a que universidad irás."
              className="w-full p-3 rounded-lg outline-none bg-white border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-300 transition h-12"
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

          {/* --- Texto legal + 3 checkboxes --- */}
          <div className="text-xs text-gray-600 space-y-3">
            <p>
              De acuerdo a lo establecido en la legislación vigente en materia
              de Protección de Datos de Carácter Personal, Reglamento 2016/679
              General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de
              5 de diciembre, de protección de datos de carácter personal y
              garantía de los derechos digitales (LOPDGDD), se le informa que
              los datos personales que nos facilite a través de dicho formulario
              serán tratados por <strong>HELLO FLAT MATE, S.L.</strong>, con la
              finalidad de gestionar su reserva. Para más información consulte
              la{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-blue-600 underline">
                política de privacidad
              </a>
              .
            </p>

            {/* Política de privacidad + publicidad */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={privacyWithAds}
                onChange={() => {
                  setPrivacyWithAds(!privacyWithAds);
                  if (!privacyWithAds) setPrivacyWithoutAds(false);
                }}
                className="mt-0.5"
              />
              <span>
                He leído y acepto la política de privacidad de HELLO FLAT MATE,
                S.L., <strong>así como el envío de publicidad</strong>.
              </span>
            </label>

            {/* Política de privacidad sin publicidad */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={privacyWithoutAds}
                onChange={() => {
                  setPrivacyWithoutAds(!privacyWithoutAds);
                  if (!privacyWithoutAds) setPrivacyWithAds(false);
                }}
                className="mt-0.5"
              />
              <span>
                He leído y acepto la política de privacidad de HELLO FLAT MATE,
                S.L.,{" "}
                <strong>pero no estoy interesado en recibir publicidad</strong>.
              </span>
            </label>

            {/* Confirmo que he leído las cláusulas del contrato */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={contractClausesConfirmed}
                onChange={() =>
                  setContractClausesConfirmed(!contractClausesConfirmed)
                }
                className="mt-0.5"
              />
              <span>
                Confirmo que he leído las{" "}
                <strong>cláusulas del contrato</strong>.
              </span>
            </label>
          </div>

          {/* Botón de reservación */}
          <ReservationButton
            disabled={
              isSubmitting ||
              !(
                contractClausesConfirmed &&
                (privacyWithAds || privacyWithoutAds)
              )
            }
            callback={handleSubmit}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
