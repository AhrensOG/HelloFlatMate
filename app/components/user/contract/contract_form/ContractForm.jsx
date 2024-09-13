import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import TitleSection from "../TitleSection";
import { Context } from "@/app/context/GlobalContext";
import { saveUserContractInformation } from "@/app/context/actions";
import axios from "axios";

const ContractForm = ({ handleContinue, handleBack }) => {
  const { state, dispatch } = useContext(Context);
  const [prevData, setPrevData] = useState(false);

  useEffect(() => {
    if (state?.user?.id) {
      const user = state?.user;
      const date = new Date(user?.birthDate);
      const readableDate = date.toLocaleString("es-ES", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      setPrevData({
        name: user.name,
        lastName: user.lastName,
        dni: user.idNum,
        phone: user.phone,
        city: user.city,
        email: user.email,
        street: user.street,
        streetNumber: user.streetNumber,
        postalCode: user.postalCode,
        age: user.age,
        birthDate: readableDate,
        id: user.id,
      });
    }
  }, [state]);

  const initialValues = prevData || {
    name: "",
    lastName: "",
    dni: "",
    phone: "",
    city: "",
    email: "",
    street: "",
    streetNumber: "",
    postalCode: "",
    age: "",
    birthDate: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (
        values.name === "" ||
        values.name.trim() === "" ||
        values.lastName === "" ||
        values.lastName.trim() === "" ||
        values.dni === "" ||
        values.dni.trim() === "" ||
        values.phone === "" ||
        values.phone.trim() === "" ||
        values.city === "" ||
        values.city.trim() === "" ||
        values.street === "" ||
        values.street.trim() === "" ||
        values.streetNumber === "" ||
        values.streetNumber.trim() === "" ||
        values.postalCode === "" ||
        values.postalCode.trim() === "" ||
        values.age === "" ||
        values.birthDate === "" ||
        values.birthDate.trim() === ""
      ) {
        return toast.info("¡Recuerda completar todos los campos!");
      } else if (values.age < 18) {
        return toast.info("Debe ser mayor de 18 años");
      }
      if (values.age !== calculateAge(values.birthDate)) {
        console.log(values);
        return toast.info("La fecha de nacimiento no coincide con la edad");
      }

      try {
        await updateUser(values);
      } catch (error) {
        toast.error("Error al guardar información");
      }
    },
  });

  const calculateAge = (birthDate) => {
    const [year, month, day] = birthDate.split("-").map(Number);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    //calculamos edad
    let calculatedAge = currentYear - year;

    // Ajustamos la edad si aún no ha cumplido años este año
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  const updateUser = async (data) => {
    const userData = {
      id: prevData.id,
      name: data.name,
      lastName: data.lastName,
      idNum: data.dni,
      phone: data.phone,
      city: data.city,
      email: data.email,
      street: data.street,
      streetNumber: data.streetNumber,
      postalCode: data.postalCode,
      age: data.age,
      birthDate: data.birthDate,
    };
    try {
      toast.promise(axios.put("/api/user", userData), {
        loading: "Guardando información...",
        success: () => {
          saveUserContractInformation(dispatch, userData);
          toast.success("Información guardada");
          handleContinue();
        },
        error: "Error al guardar la información",
      });
    } catch (error) {
      toast.error("Error al guardar la información");
    }
  };

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
              <h2>Datos personales</h2>
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

              <div className="flex flex-row items-center gap-3 w-full">
                <div className="flex flex-col justify-center w-full">
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
                <div className="flex flex-col justify-center w-full">
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
              <div className="flex flex-row items-center gap-3 w-full">
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="birthDate"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Fecha de Nacimiento
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    placeholder="DD/MM/AAAA"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <label
                    htmlFor="age"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Edad
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue number-input-no-appearance"
                  />
                </div>
              </div>
              <h2 className="form-title">Direccion</h2>
              <div className="flex flex-row justify-center items-center gap-3 w-full">
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="street"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Calle
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.street}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="streetNumber"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Numero
                  </label>
                  <input
                    id="streetNumber"
                    name="streetNumber"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.streetNumber}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 w-full">
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="city"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Ciudad
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="w-full flex flex-col justify-center ">
                  <label
                    htmlFor="postalCode"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Codigo postal
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.postalCode}
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
