"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ToDoItem from "./auxiliarComponents/ToDoItem";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import { useTranslations } from "next-intl";

const Incidences = () => {
  const t = useTranslations("user_incidences");
  const { state, dispatch } = useContext(Context);
  const [showForm, setShowForm] = useState(false);

  const daysOfWeek = [
    t("long_days.sunday"),
    t("long_days.monday"),
    t("long_days.tuesday"),
    t("long_days.wednesday"),
    t("long_days.thursday"),
    t("long_days.friday"),
    t("long_days.saturday"),
  ];

  const hours = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const generateNextDays = () => {
    const today = new Date();
    const result = [];

    for (let i = 1; i <= 16; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      if (day.getDay() !== 0) {
        result.push({
          date: day,
          label: `${daysOfWeek[day.getDay()]} ${day.getDate()}/${
            day.getMonth() + 1
          }`,
        });
      }
    }
    return result;
  };

  const client = state.user;
  const leaseOrders =
    client?.leaseOrdersRoom?.filter((order) => order.isActive) || [];

  const parseDate = (date, time) => {
    const [hours, minutes] = time.split(":");
    const fullDate = new Date(date);
    fullDate.setUTCHours(hours, minutes, 0, 0);
    return fullDate;
  };

  const validationSchema = Yup.object({
    selectedOrderId: Yup.string().required(
      "Debes seleccionar una orden de alquiler"
    ),
    type: Yup.string().required("El tipo de servicio es obligatorio"),
    selectedDate: Yup.object().nullable().required("Selecciona un día"),
    selectedTime: Yup.string().required("Selecciona un horario"),
    clientMessage: Yup.string().required("El mensaje es obligatorio"),
    isPresent: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    const toastId = toast.loading("Solicitando...");
    const selectedOrder = leaseOrders.find(
      (order) => order.id.toString() === values.selectedOrderId
    );
    if (!selectedOrder) {
      toast.info("Orden inválida");
      return;
    }
    const startDate = parseDate(values.selectedDate.date, values.selectedTime);

    let imageUrl = "";

    if (values.imageFile) {
      try {
        const uploaded = await uploadFiles(
          [values.imageFile],
          "Tareas_Mantenimiento"
        );
        if (uploaded instanceof Error) throw uploaded;
        imageUrl = uploaded[0].url;
      } catch (error) {
        console.log("Error al subir la imagen:", error);
        toast.info("Error al subir imagen", {
          description: "Intenta nuevamente o contacta a nuestro soporte",
        });
      }
    }

    const dataToSend = {
      type: values.type,
      startDate,
      title:
        values.type === "CLEAN"
          ? "Servicio de limpieza"
          : "Servicio de reparación",
      body:
        values.type === "CLEAN"
          ? `Limpieza solicitada para el ${startDate.toLocaleDateString(
              "es-ES"
            )}`
          : `Reparación solicitada para el ${startDate.toLocaleDateString(
              "es-ES"
            )}`,
      clientId: client?.id,
      leaseOrderId: selectedOrder.id,
      propertyId: selectedOrder.propertyId,
      clientMessage: values.clientMessage,
      isPresent: values.isPresent,
      imageUrl: imageUrl || null,
    };

    try {
      await axios.post("/api/to_do/user_panel", dataToSend);
      toast.success("Solicitud enviada correctamente", { id: toastId });
      await isUserLogged(dispatch);
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.info("Hubo un error al enviar la solicitud", {
        id: toastId,
        description: "Intenta nuevamente o contacta con el soporte",
      });
    }
  };

  return (
    <div className="w-full space-y-8 bg-white p-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          {t("form.title")}
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          {t("description_1")} <strong>{t("description_2")}</strong>{" "}
          {t("description_3")} <strong>{t("description_4")}</strong>{" "}
          {t("description_5")}
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#440cac] text-white px-4 py-2 rounded-lg shadow hover:bg-[#361089] transition">
          {showForm ? t("close_form") : t("open_form")}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6">
          <Formik
            initialValues={{
              selectedOrderId: "",
              type: "",
              selectedDate: null,
              selectedTime: "",
              clientMessage: "",
              isPresent: false,
              imageUrl: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ values, setFieldValue, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                {leaseOrders.length > 0 ? (
                  <div>
                    <label>{t("form.select_order")}</label>
                    <Field
                      as="select"
                      name="selectedOrderId"
                      className="w-full border rounded px-3 py-2">
                      <option>{t("form.select_order_placeholder")}</option>
                      {leaseOrders.map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.room.serial} –{" "}
                          {new Date(order.startDate).toLocaleDateString(
                            "es-ES"
                          )}{" "}
                          a{" "}
                          {new Date(order.endDate).toLocaleDateString("es-ES")}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="selectedOrderId"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    {t("form.dont_have_orders")}
                  </p>
                )}

                <div>
                  <label className="block mb-1 font-medium">
                    {t("form.select_type")}
                  </label>
                  <Field
                    as="select"
                    name="type"
                    className="w-full border rounded px-3 py-2">
                    <option value="">
                      {t("form.select_type_placeholder")}
                    </option>
                    <option value="CLEAN">{t("form.type_clean")}</option>
                    <option value="REPAIR">{t("form.type_repair")}</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="contain-inline-size">
                  <label className="block mb-1 font-medium">
                    {t("form.select_day")}
                  </label>
                  <div className="flex gap-2 overflow-x-auto scrollbar-thin">
                    {generateNextDays().map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFieldValue("selectedDate", day)}
                        className={`px-4 py-2 rounded border capitalize ${
                          values.selectedDate?.label === day.label
                            ? "border border-[#440cac] text-[#440cac]"
                            : "bg-white"
                        }`}>
                        {day.label}
                      </button>
                    ))}
                  </div>
                  <ErrorMessage
                    name="selectedDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="contain-inline-size">
                  <label className="block mb-1 font-medium">
                    {t("form.select_time")}
                  </label>
                  <div className="flex gap-2 overflow-x-auto scrollbar-thin">
                    {hours.map((hour, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setFieldValue("selectedTime", hour)}
                        className={`px-4 py-2 rounded border ${
                          values.selectedTime === hour
                            ? "border border-[#440cac] text-[#440cac]"
                            : "bg-white"
                        }`}>
                        {hour}
                      </button>
                    ))}
                  </div>
                  <ErrorMessage
                    name="selectedTime"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    {t("form.additional_message")}
                  </label>
                  <Field
                    as="textarea"
                    name="clientMessage"
                    className="w-full border rounded px-3 py-2"
                    rows={4}
                    placeholder={t("form.message_placeholder")}
                  />
                  <ErrorMessage
                    name="clientMessage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    {t("form.upload_image")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("imageFile", file);
                    }}
                    className="block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-[#dcd4ef] file:bg-[#f3f0fa] file:text-[#440cac] hover:file:bg-[#e8e2f7] transition duration-200"
                  />
                  {values.imageFile && (
                    <p className="text-xs text-gray-600 mt-1">
                      Archivo listo para enviar ✅
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="isPresent"
                    id="presentCheckbox"
                    className="w-6 h-6"
                  />
                  <label htmlFor="presentCheckbox">
                    {t("form.is_present")}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    isValid
                      ? "bg-[#440cac] text-white hover:bg-[#361089]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  {t("form.submit")}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      )}

      {client?.toDos?.length > 0 && (
        <div className="space-y-6 mt-10">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("history.title")}
          </h2>

          {client.toDos
            ?.slice()
            .sort((a, b) => {
              const order = {
                IN_PROGRESS: 0,
                PENDING: 1,
                COMPLETED: 2,
                CANCELLED: 3,
              };
              return order[a.status] - order[b.status];
            })
            .map((todo) => {
              const leaseOrder = client.leaseOrdersRoom?.find(
                (order) => order.id === todo.leaseOrderId
              );

              const period = leaseOrder
                ? `${new Date(leaseOrder.startDate).toLocaleDateString(
                    "es-ES"
                  )} - ${new Date(leaseOrder.endDate).toLocaleDateString(
                    "es-ES"
                  )}`
                : t("history.no_order");

              const serial = leaseOrder?.room?.serial || t("history.unknown");

              return (
                <ToDoItem
                  key={todo.id}
                  todo={todo}
                  serial={serial}
                  period={period}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Incidences;
