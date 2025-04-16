"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { useTranslations } from "next-intl";
import ToDoItem from "./auxiliarComponents/ToDoItem";
import ToDoForm from "./auxiliarComponents/ToDoForm";

const Incidences = () => {
  const t = useTranslations("user_incidences");
  const { state } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const [toDos, setToDos] = useState([]);

  const client = state.user;

  useEffect(() => {
    const fetchToDos = async () => {
      if (!client?.id) return;

      try {
        const res = await axios.get(`/api/to_do/user_panel?id=${client.id}`);
        setToDos(res.data);
      } catch (error) {
        console.error("Error al obtener incidencias:", error);
      }
    };

    fetchToDos();
  }, [client?.id]);

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
        <ToDoForm leaseOrders={client?.leaseOrdersRoom} client={client} />
      )}

      {toDos.length > 0 && (
        <div className="space-y-6 mt-10">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("history.title")}
          </h2>
          {toDos
            .slice()
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
