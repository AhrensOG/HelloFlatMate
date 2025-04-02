"use client";

import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TenantCard from "./auxiliarComponents/TenantCard";
import { useTranslations } from "next-intl";
import TenantConsumption from "./auxiliarComponents/TenantConsumption";

const CATEGORY_LABEL = {
  HELLO_LANDLORD: "hellolandlord",
  HELLO_ROOM: "helloroom",
  HELLO_COLIVING: "hellocoliving",
  HELLO_STUDIO: "hellostudio",
};

const MyTenants = () => {
  const { state } = useContext(Context);
  const [propertiesWithTenants, setPropertiesWithTenants] = useState([]);
  const [activeTab, setActiveTab] = useState("current");
  const [expandedProperties, setExpandedProperties] = useState({});
  const [expandedRooms, setExpandedRooms] = useState({});
  const t = useTranslations("owner_panel.my_tenants");

  useEffect(() => {
    const getPropertiesAndTenants = async () => {
      try {
        if (!state.user || state.user?.role !== "OWNER") return;
        const res = await axios.get(
          "/api/owner/new_panel/property_tenants?ownerId=" + state.user?.id
        );
        setPropertiesWithTenants(res.data);
      } catch (error) {
        console.error("Error en getAllProperties:", error);
      }
    };

    getPropertiesAndTenants();
  }, [state]);

  const toggleProperty = (id) => {
    setExpandedProperties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRoom = (serial) => {
    setExpandedRooms((prev) => ({ ...prev, [serial]: !prev[serial] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-white">
      <div className="flex gap-4 mb-4 border-b">
        <button
          onClick={() => setActiveTab("current")}
          className={`px-4 pb-2 text-xl font-bold transition duration-300 ${
            activeTab === "current"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}>
          {t("current_tenants")}
        </button>
        <button
          onClick={() => setActiveTab("old")}
          className={`px-4 pb-2 text-xl font-bold transition duration-300 ${
            activeTab === "old"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-700"
          }`}>
          {t("old_tenants")}
        </button>
      </div>

      {propertiesWithTenants.length === 0 ? (
        <p className="text-sm text-gray-500">{t("no_tenants")}</p>
      ) : (
        propertiesWithTenants.map((property) => {
          const isPropertyExpanded = expandedProperties[property.id];
          return (
            <div
              key={property.id}
              className="mb-4 border bg-gray-50 rounded shadow cursor-pointer">
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleProperty(property.id)}>
                <h2 className="text-md md:text-lg font-bold text-gray-700">
                  {property.street} {property.streetNumber}, {property.city} -{" "}
                  {property.zone}
                </h2>
                <p className="text-xs md:text-sm text-gray-500">
                  {t("serial")}: {property.serial} | Tipo:{" "}
                  {CATEGORY_LABEL[property.category]}
                </p>
              </div>

              <AnimatePresence>
                {isPropertyExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4">
                    {property.rooms.map((room) => {
                      const isRoomExpanded = expandedRooms[room.serial];
                      const currentTenants = room.leaseOrdersRoom.filter(
                        (order) => order.isActive
                      );
                      const oldTenants = room.leaseOrdersRoom.filter(
                        (order) =>
                          !order.isActive && order.status !== "REJECTED"
                      );
                      const tenantsToShow =
                        activeTab === "current" ? currentTenants : oldTenants;
                      return (
                        <div key={room.serial} className="mb-2">
                          <div
                            className="bg-white p-3 border rounded cursor-pointer shadow-sm"
                            onClick={() => toggleRoom(room.serial)}>
                            <h3 className="text-sm md:text-base font-medium text-hfm-dark">
                              {t("room")} {room.serial}
                            </h3>
                          </div>
                          <AnimatePresence>
                            {isRoomExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 space-y-4">
                                {tenantsToShow.length > 0 ? (
                                  <div className="w-full flex gap-4">
                                    {tenantsToShow.map((order, i) => (
                                      <div
                                        key={i}
                                        className="w-full flex flex-row flex-wrap justify-between items-start gap-4">
                                        <TenantCard
                                          order={{
                                            ...order,
                                            category: property.category,
                                            roomSerial: room.serial,
                                          }}
                                          isOld={activeTab === "old"}
                                        />
                                        <TenantConsumption
                                          order={{
                                            ...order,
                                            category: property.category,
                                            roomSerial: room.serial,
                                          }}
                                          isOld={activeTab === "old"}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-400">
                                    {t("no_tenants")}
                                  </p>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </motion.div>
  );
};

export default MyTenants;
