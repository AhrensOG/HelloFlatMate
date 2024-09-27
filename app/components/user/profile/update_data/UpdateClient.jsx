import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { plus_jakarta } from "@/font";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UpdateClient() {
  const { state } = useContext(Context);
  const [prevData, setPrevData] = useState();
  const router = useRouter();

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
        emergencyName: user.emergencyName || "",
        emergencyPhone: user.emergencyPhone || "",
        emergencyEmail: user.emergencyEmail || "",
        howMetUs: user.howMetUs || "",
        destinationUniversity: user.destinationUniversity || "",
        homeUniversity: user.homeUniversity || "",
        arrivalDate: user.arrivalDate || "",
        arrivalTime: user.arrivalTime || "",
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
    emergencyName: "",
    emergencyPhone: "",
    emergencyEmail: "",
    howMetUs: "",
    destinationUniversity: "",
    homeUniversity: "",
    arrivalDate: "",
    arrivalTime: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
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
        return toast.info("La fecha de nacimiento no coincide con la edad");
      }
      toast.promise(updateUser(values), {
        loading: "Actualizando información...",
        success: () => {
          toast.success("Información actualizada con éxito");
          router.push("/pages/user/profile");
        },
        error: "Error al actualizar la información",
      });
    },
  });

  const calculateAge = (birthDate) => {
    const [day, month, year] = birthDate.split("/").map(Number);
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    let calculatedAge = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const updateUser = async (data) => {
    const userData = {
      id: state?.user?.id,
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
      emergencyName: data.emergencyName,
      emergencyPhone: data.emergencyPhone,
      emergencyEmail: data.emergencyEmail,
      howMetUs: data.howMetUs,
      destinationUniversity: data.destinationUniversity,
      homeUniversity: data.homeUniversity,
      arrivalDate: data.arrivalDate,
      arrivalTime: data.arrivalTime,
    };
    try {
      const response = await axios.put("/api/user", userData);
      if (response.status === 200) {
        return toast.success("Información actualizada");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`${plus_jakarta.className} w-full flex flex-col gap-7 p-4 inset-0`}
    >
      <h1 className="pl-4 font-bold text-xl mt-4">Actualizar Información</h1>
      <div className="w-full grid place-items-center">
        <div className="w-full p-2 space-y-8 max-w-screen-sm">
          <section className="w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col justify-center items-center gap-4"
              aria-labelledby="form-title"
            >
              <h2 id="form-title" className="sr-only">
                Formulario de Contrato
              </h2>
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
                <div className="flex flex-col justify-center self-start w-full">
                  <label
                    htmlFor="birthDate"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Fecha de Nacimiento
                  </label>
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    placeholder="DD/MM/AAAA"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="flex flex-col justify-center self-start w-full">
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
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
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

              {/* Sección de emergencia */}
              <h2>En caso de emergencia</h2>
              <div className="flex flex-row items-center gap-3 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="emergencyName"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Nombre de emergencia
                  </label>
                  <input
                    id="emergencyName"
                    name="emergencyName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.emergencyName}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="emergencyPhone"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Teléfono de emergencia
                  </label>
                  <input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.emergencyPhone}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="emergencyEmail"
                  className="text-xs text-resolution-blue drop-shadow-sm"
                >
                  Email de emergencia
                </label>
                <input
                  id="emergencyEmail"
                  name="emergencyEmail"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.emergencyEmail}
                  className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                />
              </div>

              {/* Otros datos */}
              <h2>OTROS DATOS</h2>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="howMetUs"
                  className="text-xs text-resolution-blue drop-shadow-sm"
                >
                  ¿Cómo nos conociste?
                </label>
                <select
                  id="howMetUs"
                  name="howMetUs"
                  onChange={formik.handleChange}
                  value={formik.values.howMetUs}
                  className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Recommended by friends">
                    Recomendado por amigos
                  </option>
                  <option value="Recommended by University">
                    Recomendado por la Universidad
                  </option>
                  <option value="helloflatmate website">
                    Página web helloflatmate
                  </option>
                  <option value="Idealista">Idealista</option>
                  <option value="Other websites">Otros portales web</option>
                  <option value="Other">Otros</option>
                </select>
              </div>

              {/* Información de la universidad */}
              <div className="w-full flex flex-col">
                <label
                  htmlFor="destinationUniversity"
                  className="text-xs text-resolution-blue drop-shadow-sm"
                >
                  ¿En qué universidad/escuela vas a estudiar?
                </label>
                <input
                  id="destinationUniversity"
                  name="destinationUniversity"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.destinationUniversity}
                  className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                />
              </div>
              <div className="w-full flex flex-col">
                <label
                  htmlFor="homeUniversity"
                  className="text-xs text-resolution-blue drop-shadow-sm"
                >
                  ¿Cuál es tu universidad de origen?
                </label>
                <input
                  id="homeUniversity"
                  name="homeUniversity"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.homeUniversity}
                  className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                />
              </div>

              {/* Datos de llegada */}
              <h2>DATOS DE LLEGADA</h2>
              <div className="flex flex-row items-center gap-3 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="arrivalDate"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Día de tu llegada
                  </label>
                  <input
                    id="arrivalDate"
                    name="arrivalDate"
                    type="date"
                    onChange={formik.handleChange}
                    value={formik.values.arrivalDate}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="arrivalTime"
                    className="text-xs text-resolution-blue drop-shadow-sm"
                  >
                    Hora de llegada
                  </label>
                  <input
                    id="arrivalTime"
                    name="arrivalTime"
                    type="time"
                    onChange={formik.handleChange}
                    value={formik.values.arrivalTime}
                    className="w-full drop-shadow-md border border-slate-300 rounded-md outline-none px-2 py-1 text-resolution-blue"
                  />
                </div>
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
    </motion.main>
  );
}
