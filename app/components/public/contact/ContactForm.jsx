"use client";
import React from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { sendEmail } from "@/app/context/actions";
import { toast } from "sonner";

const HFM_EMAIL = process.env.NEXT_PUBLIC_HFM_MAIL;

const ContactForm = () => {
  // ✅ Esquema de Validación con Yup
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
  });

  // ✅ Valores Iniciales
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  // ✅ Manejar el Envío del Formulario
  const handleSubmit = async (values) => {
    const toastId = toast.loading("Enviando mensaje...");
    try {
      const emailData = {
        to: HFM_EMAIL,
        subject: `¡${values.name} nos ha contactado!`,
        text: `${values.name} - (${values.email}) / comentario: ${values.message}`,
      };

      await sendEmail(emailData);

      values.name = "";
      values.email = "";
      values.message = "";

      window.open("/contacto/gracias", "_blank");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("¡Ups! Ocurrió un error al enviar tu mensaje.", {
        description: "Intenta nuevamente o contacta con nuestro soporte.",
        id: toastId,
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 grow flex flex-col justify-center items-center">
      {/* Título y Descripción */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          ¡Hablemos!
        </h1>
        <p className="text-lg text-gray-600 max-w-screen-lg">
          ¿Tienes alguna consulta, sugerencia o simplemente quieres saludarnos?
          ¡Completa el formulario y nos pondremos en contacto contigo lo antes
          posible!
        </p>
      </motion.div>

      {/* Formulario con Formik */}
      <motion.div
        className="max-w-2xl w-full mx-auto bg-white rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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

              {/* Botón */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#440CAC] hover:bg-[#440CAC]/90 duration-300 text-white px-6 py-3 rounded-md"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </section>
  );
};

export default ContactForm;
