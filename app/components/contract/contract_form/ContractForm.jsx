import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import TitleSection from "../TitleSection";
import { Context } from "@/app/context/GlobalContext";
import { saveUserContractInformation } from "@/app/context/actions";

const ContractForm = ({ handleContinue, handleBack }) => {
  const { state, dispatch } = useContext(Context);

  const initialValues = state.reservationInfo?.userContractInformation || {
    name: "",
    lastName: "",
    dni: "",
    phone: "",
    location: "",
    address: "",
    email: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (
        values.name === "" ||
        values.lastName === "" ||
        values.dni === "" ||
        values.phone === "" ||
        values.location === "" ||
        values.address === ""
      ) {
        return toast.info("¡Recuerda completar todos los campos!");
      }

      try {
        saveUserContractInformation(dispatch, values);
        toast.success("Información almacenada");
        return handleContinue();
      } catch (error) {
        return toast.error("Error al guardar informacion");
      }
    },
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4`}
    >
      <TitleSection
        title={"Contrato de renta"}
        action={() => {
          handleBack();
        }}
      />
      <div className="w-full grid place-items-center">
        <div className="w-full p-2 space-y-8 max-w-screen-sm">
          <section className="w-full">
            <div className="w-full text-center">
              <span className="text-xs font-medium">
                Necesitaremos que complete el siguiente formulario
              </span>
            </div>
          </section>
          <section className="w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col justify-center items-center gap-4"
              aria-labelledby="form-title"
            >
              <h1 id="form-title" className="sr-only">
                Formulario de Contrato
              </h1>
              <div className="flex flex-row justify-center items-center gap-3 w-full">
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="name"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="lastName"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 w-full">
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="phone"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Telefono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="dni"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    DNI
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.dni}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 w-full">
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="location"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Pais / Ciudad
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="address"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Direccion
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-center ">
                <label
                  htmlFor="email"
                  className="text-xs text-resolution-blue drop-shadow-sm"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#0C1660] rounded-lg px-4 py-2"
              >
                Continuar
              </button>
            </form>
          </section>
        </div>
      </div>
    </motion.section>
  );
};

export default ContractForm;
