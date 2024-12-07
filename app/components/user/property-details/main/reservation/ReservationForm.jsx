import React from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as yup from "yup";
import ReservationButton from "../ReservationButton";

const validationSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
  idNum: yup.string().required("El ID/Pasaporte es requerido"),
  street: yup.string().required("La calle es requerida"),
  streetNumber: yup.string().required("El número es requerido"),
  postalCode: yup.string().required("El código postal es requerido"),
  city: yup.string().required("La ciudad es requerida"),
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
  isSubmitting
}) => {
  return (
    <Formik
      initialValues={{
        name: data?.user?.name || "",
        lastName: data?.user?.lastName || "",
        idNum: data?.user?.idNum || "",
        street: data?.user?.street || "",
        streetNumber: data?.user?.streetNumber || "",
        postalCode: data?.user?.postalCode || "",
        city: data?.user?.city || "",
        country: data?.user?.country || "",
        reasonForValencia: data?.user?.reasonForValencia || "",
        personalReview: data?.user?.personalReview || "",
        phone: data?.user?.phone || "",
        email: data?.user?.email || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleReservationSubmit(values)}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Form className="space-y-6">
          {/* Nombre y Apellido */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Nombre
              </label>
              <Field
                name="name"
                placeholder="Escribe tu nombre"
                className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-xs mt-1 ml-1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Apellido
              </label>
              <Field
                name="lastName"
                placeholder="Escribe tu apellido"
                className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
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
            <label className="block text-xs font-medium text-gray-500 mb-2">
              ID/Pasaporte
            </label>
            <Field
              name="idNum"
              placeholder="Introduce tu ID o pasaporte"
              className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
            />
            <ErrorMessage
              name="idNum"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Dirección
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Field
                  name="street"
                  placeholder="Calle"
                  className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
                />
                <ErrorMessage
                  name="street"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <Field
                  name="streetNumber"
                  placeholder="Número"
                  className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
                />
                <ErrorMessage
                  name="streetNumber"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <Field
                  name="postalCode"
                  placeholder="Código Postal"
                  className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
                />
                <ErrorMessage
                  name="postalCode"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <Field
                  name="city"
                  placeholder="Ciudad"
                  className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <Field
                  name="country"
                  placeholder="País"
                  className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
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
            <label className="block text-xs font-medium text-gray-500 mb-2">
              ¿Por qué quieres estar en Valencia?
            </label>
            <Field
              as="select"
              name="reasonForValencia"
              className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition"
            >
              <option value="">Selecciona una opción</option>
              <option value="Por estudios">Por estudios</option>
              <option value="Por turismo">Por turismo</option>
              <option value="A vivir">A vivir</option>
              <option value="Otro">Otro</option>
            </Field>
            <ErrorMessage
              name="reasonForValencia"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Reseña personal */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Reseña personal
            </label>
            <Field
              name="personalReview"
              as="textarea"
              placeholder="Describe tus gustos, costumbres, etc."
              className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 transition h-24"
            />
            <ErrorMessage
              name="personalReview"
              component="p"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">
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
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Correo electrónico
            </label>
            <Field
              name="email"
              placeholder="Tu correo electrónico"
              disabled
              className="w-full p-3 rounded-lg outline-none bg-gray-100 border border-gray-300 text-sm text-gray-700"
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

// const handleCheckout = async (reservation, user, leaseOrderId) => {
//   const propertyId = reservation?.propertyId;
//   const userEmail = user?.email;
//   const price = parseInt(reservation?.unitPrice);
//   const propertyName = reservation?.propertyName;

//   try {
//     const response = await fetch("/api/stripe/create-checkout-session", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         propertyId,
//         userEmail,
//         price,
//         propertyName,
//         leaseOrderId,
//         roomId: reservation?.roomId || false,
//         category,
//       }),
//     });
//     const session = await response.json();
//     const stripe = await stripePromise;

//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });

//     toast.info("Seras redirigido a la pagina de pago");
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
