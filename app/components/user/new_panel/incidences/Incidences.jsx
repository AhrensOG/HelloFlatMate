"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { useTranslations } from "next-intl";
import ToDoItem from "./auxiliarComponents/ToDoItem";
import ToDoForm from "./auxiliarComponents/ToDoForm";
import clsx from "clsx";

const Incidences = () => {
  const t = useTranslations("user_incidences");
  const { state } = useContext(Context);
  const [showForm, setShowForm] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("IN_PROGRESS");

  const client = state.user;

  const fetchToDos = async () => {
    if (!client?.id) return;

    try {
      const res = await axios.get(`/api/to_do/user_panel?id=${client.id}`);
      setToDos(res.data);
    } catch (error) {
      console.error("Error al obtener incidencias:", error);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, [client?.id]);

  const statusTabs = {
    IN_PROGRESS: t("tabs.IN_PROGRESS"),
    PENDING: t("tabs.PENDING"),
    COMPLETED: t("tabs.COMPLETED"),
    CANCELLED: t("tabs.CANCELLED"),
  };

  const filteredToDos = toDos
    .filter((todo) => {
      const isMyRoom = todo.incidentSite === "MY_ROOM";
      const isMine = todo.userId === client.id;
      const matchesTab = todo.status === selectedTab;
      return matchesTab && (!isMyRoom || isMine);
    })
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );

  return (
    <div className="w-full space-y-8 bg-white p-6 contain-inline-size">
      {/* Header y Formulario */}
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

      {/* Formulario */}
      {showForm && (
        <ToDoForm leaseOrders={client?.leaseOrdersRoom} client={client} refetch={fetchToDos} />
      )}

      {/* Tabs */}
      {toDos.length > 0 && (
        <>
          <div className="relative mb-4">
            <div className="flex overflow-x-auto scrollbar-none gap-2 border-b pb-2 max-w-full px-1 sm:px-0 scrollbar-hide">
              {Object.entries(statusTabs).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={clsx(
                    "flex-shrink-0 px-3 py-2 text-[11px] sm:text-xs md:text-sm font-semibold uppercase whitespace-nowrap transition-all",
                    selectedTab === key
                      ? "border-b-2 border-blue-700 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  )}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Lista de tareas */}
          <div className="space-y-6 mt-4">
            {filteredToDos.length === 0 ? (
              <p className="text-sm text-gray-500">{t("history.empty")}</p>
            ) : (
              filteredToDos.map((todo) => {
                const isMine = todo.userId === client.id;

                const leaseOrder = client.leaseOrdersRoom?.find(
                  (order) => order.id === todo.leaseOrderId
                );

                const period = leaseOrder
                  ? `${new Date(leaseOrder.startDate).toLocaleDateString(
                      "es-ES"
                    )} - ${new Date(leaseOrder.endDate).toLocaleDateString(
                      "es-ES"
                    )}`
                  : "";

                const serial = isMine
                  ? leaseOrder?.room?.serial || t("history.unknown")
                  : todo.property?.serial || t("history.unknown");

                return (
                  <ToDoItem
                    key={todo.id}
                    todo={todo}
                    serial={serial}
                    period={period}
                    refetch={fetchToDos}
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Incidences;
