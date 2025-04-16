"use client";

import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import { uploadFiles } from "@/app/firebase/uploadFiles";
import { isUserLogged } from "@/app/context/actions/isUserLogged";
import { Context } from "@/app/context/GlobalContext";
import { useTranslations } from "next-intl";

const ToDoForm = ({ leaseOrders = [], client }) => {
  const t = useTranslations("user_incidences");
  const { dispatch } = useContext(Context);

  const siteLabels = {
    MY_ROOM: t("form.site_labels.MY_ROOM"),
    KITCHEN: t("form.site_labels.KITCHEN"),
    LIVING_ROOM: t("form.site_labels.LIVING_ROOM"),
    WC1: t("form.site_labels.WC1"),
    WC2: t("form.site_labels.WC2"),
    HALLWAY_COMMON_AREAS: t("form.site_labels.HALLWAY_COMMON_AREAS"),
    OTHERS: t("form.site_labels.OTHERS"),
  };

  const typeLabels = {
    ELECTRICITY: t("form.type_labels.ELECTRICITY"),
    CARPENTRY: t("form.type_labels.CARPENTRY"),
    LOCKSMITHING: t("form.type_labels.LOCKSMITHING"),
    PLUMBING: t("form.type_labels.PLUMBING"),
    GLAZING: t("form.type_labels.GLAZING"),
    WIFI: t("form.type_labels.WIFI"),
    APPLIANCES: t("form.type_labels.APPLIANCES"),
    FURNITURE: t("form.type_labels.FURNITURE"),
    OTHERS: t("form.type_labels.OTHERS"),
  };

  const incidentSites = Object.keys(siteLabels);
  const incidentTypes = Object.keys(typeLabels);

  const validationSchema = Yup.object({
    incidentSite: Yup.string().required(t("form.select_order")),
    incidentType: Yup.string().required(t("form.select_type")),
    preferredTimeSlot: Yup.string()
      .oneOf(["MORNING", "AFTERNOON"])
      .required(t("form.select_time")),
    clientMessage: Yup.string().required(t("form.message_placeholder")),
    imageFile: Yup.mixed().required(t("form.upload_image")),
    isPresent: Yup.boolean(),
    emergency: Yup.boolean(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const toastId = toast.loading("Solicitando...");

    const now = new Date();
    const selectedOrder = leaseOrders.find((order) => {
      const start = new Date(order.startDate);
      const end = new Date(order.endDate);
      return start <= now && now <= end;
    });

    if (!selectedOrder) {
      toast.info("No se encontró una orden de alojamiento vigente.", {
        description:
          "Si crees que es un error por favor, contacta con nuestro soporte.",
        id: toastId,
      });
      return;
    }

    let imageUrl = "";
    try {
      const uploaded = await uploadFiles(
        [values.imageFile],
        "Tareas_Mantenimiento"
      );
      if (uploaded instanceof Error) throw uploaded;
      imageUrl = uploaded[0].url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error(t("toast.image_error"));
    }

    const dataToSend = {
      type: "REPAIR",
      title: t("titles.repair"),
      body: t("body.repair"),
      preferredTimeSlot: values.preferredTimeSlot,
      clientId: client?.id,
      leaseOrderId: selectedOrder.id,
      propertyId: selectedOrder.propertyId,
      clientMessage: values.clientMessage,
      isPresent: values.isPresent,
      emergency: values.emergency,
      incidentSite: values.incidentSite,
      incidentType: values.incidentType,
      imageUrl,
    };

    try {
      await axios.post("/api/to_do/user_panel", dataToSend);
      toast.success(t("toast.success"), { id: toastId });
      await isUserLogged(dispatch);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(t("toast.submit_error"), {
        id: toastId,
        description: t("toast.support"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 contain-inline-size">
      <Formik
        initialValues={{
          incidentSite: "",
          incidentType: "",
          preferredTimeSlot: "",
          clientMessage: "",
          isPresent: false,
          emergency: false,
          imageFile: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ values, setFieldValue, isValid, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label>{t("form.select_order")}</label>
              <Field
                as="select"
                name="incidentSite"
                className="w-full border rounded px-3 py-2">
                <option value="">{t("form.select_order_placeholder")}</option>
                {incidentSites.map((site) => (
                  <option key={site} value={site}>
                    {siteLabels[site]}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="incidentSite"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>{t("form.select_type")}</label>
              <Field
                as="select"
                name="incidentType"
                className="w-full border rounded px-3 py-2">
                <option value="">{t("form.select_type_placeholder")}</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>
                    {typeLabels[type]}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="incidentType"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>{t("form.select_time")}</label>
              <Field
                as="select"
                name="preferredTimeSlot"
                className="w-full border rounded px-3 py-2">
                <option value="">{t("form.select_type_placeholder")}</option>
                <option value="MORNING">{t("form.morning")} (9:00 a 12:00)</option>
                <option value="AFTERNOON">{t("form.afternoon")} (12:00 a 16:00)</option>
              </Field>
              <ErrorMessage
                name="preferredTimeSlot"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label>{t("form.additional_message")}</label>
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
              <label>{t("form.upload_image")}</label>
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
                <p className="text-xs text-green-600 mt-1">
                  {t("form.image_ready")}
                </p>
              )}
              <ErrorMessage
                name="imageFile"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="emergency"
                id="emergencyCheckbox"
                className="w-5 h-5"
              />
              <label htmlFor="emergencyCheckbox">{t("form.emergency")}</label>
            </div>

            <div className="flex items-start gap-2">
              <Field
                type="checkbox"
                name="isPresent"
                id="presentCheckbox"
                className="w-5 h-5"
              />
              <label htmlFor="presentCheckbox">{t("form.is_present")}</label>
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
  );
};

export default ToDoForm;
