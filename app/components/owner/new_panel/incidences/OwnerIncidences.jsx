"use client";

import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Context } from "@/app/context/GlobalContext";
import { useTranslations } from "next-intl";
import ToDoCard from "./auxiliarComponents/ToDoCard";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

const groupByProperty = (todos) => {
  const result = {};
  todos.forEach((todo) => {
    const serial = todo.property?.serial || "Desconocido";
    if (!result[serial]) result[serial] = [];
    result[serial].push(todo);
  });
  return result;
};

const OwnerIncidences = () => {
  const t = useTranslations("owner_panel.incidences_panel");
  const { state } = useContext(Context);
  const [toDos, setToDos] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selectedTab, setSelectedTab] = useState("IN_PROGRESS");
  const cardRefs = useRef({});
  const searchParams = useSearchParams();

  const labels = {
    site: {
      MY_ROOM: t("labels.MY_ROOM"),
      KITCHEN: t("labels.KITCHEN"),
      LIVING_ROOM: t("labels.LIVING_ROOM"),
      WC1: t("labels.WC1"),
      WC2: t("labels.WC2"),
      HALLWAY_COMMON_AREAS: t("labels.HALLWAY_COMMON_AREAS"),
      OTHERS: t("labels.OTHERS"),
    },
    type: {
      ELECTRICITY: t("labels.ELECTRICITY"),
      CARPENTRY: t("labels.CARPENTRY"),
      LOCKSMITHING: t("labels.LOCKSMITHING"),
      PLUMBING: t("labels.PLUMBING"),
      GLAZING: t("labels.GLAZING"),
      WIFI: t("labels.WIFI"),
      APPLIANCE: t("labels.APPLIANCE"),
      FURNITURE: t("labels.FURNITURE"),
      OTHERS: t("labels.OTHERS"),
    },
    status: {
      PENDING: t("labels.PENDING"),
      COMPLETED: t("labels.COMPLETED"),
      CANCELLED: t("labels.CANCELLED"),
      IN_PROGRESS: t("labels.IN_PROGRESS"),
    },
    responsibility: {
      OWNER: t("labels.OWNER"),
      CLIENT: t("labels.CLIENT"),
    },
    preferred_time_slot: {
      MORNING: t("labels.MORNING"),
      AFTERNOON: t("labels.AFTERNOON"),
    },
  };

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const res = await axios.get(
          `/api/owner/new_panel/dashboard/to_do?ownerId=${state.user?.id}`
        );
        setToDos(res.data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    if (state.user?.id) fetchToDos();
  }, [state.user?.id]);

  useEffect(() => {
    const idFromQuery = searchParams.get("id");

    if (!idFromQuery || !toDos.length) return;

    const found = toDos.find((todo) => String(todo.id) === idFromQuery);

    if (found) {
      setSelectedTab(found.status);
      setExpanded((prev) => ({ ...prev, [found.id]: true }));

      setTimeout(() => {
        const el = cardRefs.current[found.id];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      setSelectedTab("IN_PROGRESS");
    }
  }, [toDos]);

  const filteredToDos = toDos
    .filter((todo) => todo.status === selectedTab)
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );

  const grouped = groupByProperty(filteredToDos);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortToDos = (todos) => {
    const STATUS_ORDER = {
      PENDING: 0,
      IN_PROGRESS: 1,
      COMPLETED: 2,
      CANCELLED: 3,
    };
  
    return [...todos].sort((a, b) => {
      if (a.status === "PENDING" && a.emergency && !(b.status === "PENDING" && b.emergency)) return -1;
      if (b.status === "PENDING" && b.emergency && !(a.status === "PENDING" && a.emergency)) return 1;
  
      // Luego por status
      const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (statusDiff !== 0) return statusDiff;
  
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    });
  };

  return (
    <div className="w-full space-y-8 bg-white pb-2">
      <header>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-gray-600 text-sm">
          {t("description_1")}
          <br />
          {t("description_2")}
        </p>
      </header>

      <div className="relative mb-4">
        <div className="flex overflow-x-auto scrollbar-none gap-2 border-b pb-2 max-w-full px-1 sm:px-0 scrollbar-hide">
          {["IN_PROGRESS", "PENDING", "COMPLETED", "CANCELLED"].map(
            (tabKey) => (
              <button
                key={tabKey}
                onClick={() => setSelectedTab(tabKey)}
                className={clsx(
                  "flex-shrink-0 px-3 py-2 text-[11px] sm:text-xs md:text-sm font-semibold uppercase whitespace-nowrap transition-all",
                  selectedTab === tabKey
                    ? "border-b-2 border-blue-700 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                )}>
                {labels.status[tabKey]}
              </button>
            )
          )}
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-sm text-gray-500">{t("no_incidences")};</p>
      ) : (
        Object.entries(grouped).map(([serial, list]) => (
          <div key={serial} className="space-y-4">
            <h2 className="text-lg font-bold border-b pb-1">{serial}</h2>
            {sortToDos(list).map((todo) => (
              <ToDoCard
                key={todo.id}
                ref={(el) => {
                  if (el) {
                    cardRefs.current[todo.id] = el;
                  }
                }}
                todo={todo}
                isExpanded={expanded[todo.id]}
                onToggle={toggleExpand}
                t={t}
                labels={labels}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerIncidences;
