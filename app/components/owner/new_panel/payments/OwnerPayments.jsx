"use client";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import PaymentIncidenceCard from "./auxiliarComponents/PaymentIncidenceCard";
import OwnerPayModal from "./auxiliarComponents/OwnerPayModal";
import { useTranslations } from "next-intl";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const OwnerPayments = () => {
  const t = useTranslations("owner_panel.payments_panel");
  const { state } = useContext(Context);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [selectedIncidence, setSelectedIncidence] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/owner/new_panel/dashboard/incidences?ownerId=${state.user?.id}`
        );

        const valid = res.data.filter((inc) => inc.amount && inc.amount > 0);

        setPending(valid.filter((inc) => inc.status === "PENDING"));
        setApproved(valid.filter((inc) => inc.status === "APPROVED"));
      } catch (err) {
        console.error("Error al obtener incidencias:", err);
      }
    };

    if (state.user?.id) fetchData();
  }, [state.user?.id]);

  const tabs = {
    pending: {
      label: t("tab.pending"),
      content: pending,
      empty: t("not_pend_pay"),
    },
    approved: {
      label: t("tab.approved"),
      content: approved,
      empty: t("not_approved_pay"),
    },
  };

  const groupBySerial = (incidences) => {
    return incidences.reduce((groups, inc) => {
      const serial = inc.property?.serial || "Desconocido";
      if (!groups[serial]) groups[serial] = [];
      groups[serial].push(inc);
      return groups;
    }, {});
  };

  const toggleGroup = (serial) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [serial]: !prev[serial],
    }));
  };

  const grouped = groupBySerial(tabs[selectedTab].content);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6 bg-white">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">{t("title")}</h1>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b pb-1 scrollbar-hide mb-4">
        {Object.entries(tabs).map(([key, tab]) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={clsx(
              "px-4 py-2 text-sm font-semibold uppercase transition-all",
              selectedTab === key
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Agrupado por propiedad */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}>
          {Object.keys(grouped).length === 0 ? (
            <p className="text-sm text-gray-500">{tabs[selectedTab].empty}</p>
          ) : (
            Object.entries(grouped).map(([serial, incidences]) => {
              const isExpanded = expandedGroups[serial];

              return (
                <div
                  key={serial}
                  className="mb-6 border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleGroup(serial)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 text-sm font-bold text-[#440CAC] border-b">
                    <span>{t("property")}: {serial}</span>
                    {isExpanded ? (
                      <HiChevronUp size={18} />
                    ) : (
                      <HiChevronDown size={18} />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white divide-y p-2">
                        {incidences.map((inc) => (
                          <PaymentIncidenceCard
                            key={inc.id}
                            incidence={inc}
                            onPayClick={() => setSelectedIncidence(inc)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedIncidence && (
          <OwnerPayModal
            incidence={selectedIncidence}
            owner={state.user}
            onClose={() => setSelectedIncidence(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OwnerPayments;
