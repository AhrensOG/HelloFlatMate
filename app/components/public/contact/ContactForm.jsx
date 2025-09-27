"use client";
import React from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendEmail } from "@/app/context/actions";
import { toast } from "sonner";
import Link from "next/link";

const HFM_EMAIL = process.env.NEXT_PUBLIC_HFM_MAIL;

const ContactForm = () => {
  // ✅ Esquema de validación (exige exactamente una de las dos opciones)
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    email: Yup.string()
      .email("El correo electrónico no es válido")
      .required("El correo electrónico es obligatorio"),
    message: Yup.string()
      .required("El mensaje es obligatorio")
      .min(10, "El mensaje debe tener al menos 10 caracteres"),
    marketingOptIn: Yup.boolean(),
    marketingOptOut: Yup.boolean(),
    // Campo “virtual” para poder mostrar el error combinado
    marketingConsent: Yup.mixed(),
  }).test("one-of-two", function (obj) {
    const { marketingOptIn, marketingOptOut } = obj || {};
    const oneSelected = !!(marketingOptIn || marketingOptOut);
    const notBoth = !(marketingOptIn && marketingOptOut);

    if (!oneSelected) {
      return this.createError({
        path: "marketingConsent",
        message: "Debes elegir una de las dos opciones de privacidad.",
      });
    }
    if (!notBoth) {
      return this.createError({
        path: "marketingConsent",
        message: "Solo puedes seleccionar una opción.",
      });
    }
    return true;
  });

  // ✅ Valores iniciales
  const initialValues = {
    name: "",
    email: "",
    message: "",
    marketingOptIn: false,
    marketingOptOut: false,
    marketingConsent: "", // solo para mostrar el error combinado
  };

  // ✅ Envío
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const toastId = toast.loading("Enviando mensaje...");
    try {
      const marketingConsent = values.marketingOptIn ? "opt_in" : "opt_out";

      const emailData = {
        to: HFM_EMAIL,
        subject: `¡${values.name} nos ha contactado!`,
        text: `${values.name} - (${values.email}) / comentario: ${values.message}\nConsentimiento marketing: ${marketingConsent === "opt_in" ? "Si" : "No"}`,
      };

      await sendEmail(emailData);
      resetForm();
      toast.dismiss(toastId);
      toast.success("Mensaje enviado correctamente.");
      window.open("/contacto/gracias", "_blank");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("¡Ups! Ocurrió un error al enviar tu mensaje.", {
        description: "Intenta nuevamente o contacta con nuestro soporte.",
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Exclusividad de checkboxes
  const handleExclusiveCheck = (setFieldValue, field) => (e) => {
    const checked = e.target.checked;
    if (field === "marketingOptIn") {
      setFieldValue("marketingOptIn", checked);
      if (checked) setFieldValue("marketingOptOut", false);
    } else {
      setFieldValue("marketingOptOut", checked);
      if (checked) setFieldValue("marketingOptIn", false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 grow flex flex-col justify-center items-center">
      {/* Título y Descripción */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          ¡Hablemos!
        </h1>
        <p className="text-lg text-gray-600 max-w-screen-lg">
          ¿Tienes alguna consulta, sugerencia o simplemente quieres saludarnos?
          ¡Completa el formulario y nos pondremos en contacto contigo lo antes
          posible!
        </p>
      </motion.div>

      {/* Formulario */}
      <motion.div
        className="max-w-2xl w-full mx-auto bg-white rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values, isValid }) => {
            const consentChosen =
              values.marketingOptIn || values.marketingOptOut;
            const bothChosen = values.marketingOptIn && values.marketingOptOut;
            const disableButton =
              isSubmitting || !consentChosen || bothChosen || !isValid;

            return (
              <Form className="space-y-4 p-6">
                {/* Nombre */}
                <label htmlFor="name">Nombre</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre completo"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Email */}
                <label htmlFor="email">Correo Electrónico</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tucorreo@example.com"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Mensaje */}
                <label htmlFor="message">Mensaje</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Escribe tu mensaje aquí..."
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* --- AVISO LEGAL + CHECKBOXES (arriba del botón, letra pequeña) --- */}
                <div className="text-xs text-gray-600 mt-6 space-y-3">
                  <p>
                    De acuerdo a lo establecido en la legislación vigente en
                    materia de Protección de Datos de Carácter Personal,
                    Reglamento 2016/679 General de Protección de Datos (RGPD) y
                    la Ley Orgánica 3/2018 (LOPDGDD), los datos facilitados se
                    tratarán por <strong>HELLO FLAT MATE, S.L.</strong> para
                    gestionar su solicitud y enviarle información más detallada.
                    Para más información consulte la{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-blue-600 font-semibold hover:underline">
                      política de privacidad
                    </Link>
                    .
                  </p>

                  <fieldset className="space-y-2">
                    <label className="flex items-start gap-2">
                      <Field
                        type="checkbox"
                        name="marketingOptIn"
                        onChange={handleExclusiveCheck(
                          setFieldValue,
                          "marketingOptIn"
                        )}
                        className="mt-0.5"
                      />
                      <span>
                        He leído y acepto la política de privacidad de HELLO
                        FLAT MATE, S.L.{" "}
                        <strong>así como el envío de publicidad</strong>.
                      </span>
                    </label>

                    <label className="flex items-start gap-2">
                      <Field
                        type="checkbox"
                        name="marketingOptOut"
                        onChange={handleExclusiveCheck(
                          setFieldValue,
                          "marketingOptOut"
                        )}
                        className="mt-0.5"
                      />
                      <span>
                        He leído y acepto la política de privacidad de HELLO
                        FLAT MATE, S.L.,{" "}
                        <strong>
                          pero no estoy interesado en recibir publicidad
                        </strong>
                        .
                      </span>
                    </label>

                    {/* Error combinado del consentimiento */}
                    <ErrorMessage
                      name="marketingConsent"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </fieldset>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={disableButton}
                  className="bg-[#440CAC] hover:bg-[#440CAC]/90 duration-300 text-white px-6 py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </section>
  );
};

export default ContactForm;
