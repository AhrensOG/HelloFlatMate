"use client";
import { Context } from "@/app/context/GlobalContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TenantCard from "./auxiliarComponents/TenantCard";
import { useTranslations } from "next-intl";

const CATEGORY_LABEL = {
    HELLO_LANDLORD: "hellolandlord",
    HELLO_ROOM: "helloroom",
    HELLO_COLIVING: "hellocoliving",
    HELLO_STUDIO: "hellostudio",
};

const MyTenants = () => {
    const { state } = useContext(Context);
    const [propertiesWithTenants, setPropertiesWithTenants] = useState([]);
    const t = useTranslations("owner_panel.my_tenants");

    useEffect(() => {
        const getPropertiesAndTenants = async () => {
            try {
                if (!state.user || state.user?.role !== "OWNER") return;
                const res = await axios.get("/api/owner/new_panel/property_tenants?ownerId=" + state.user?.id);
                setPropertiesWithTenants(res.data);
            } catch (error) {
                console.error("Error en getAllProperties:", error);
            }
        };

        getPropertiesAndTenants();
    }, [state]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full p-6 bg-white">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">{t("title")}</h1>

            {propertiesWithTenants.length === 0 ? (
                <p className="text-sm text-gray-500">{t("no_tenants")}</p>
            ) : (
                propertiesWithTenants.map((property) => (
                    <div key={property.id} className="mb-10 border border-gray-200 rounded-lg shadow-sm">
                        {/* Encabezado de propiedad */}
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <h2 className="text-md md:text-lg font-bold text-gray-700">
                                {property.street} {property.streetNumber}, {property.city} - {property.zone}
                            </h2>
                            <p className="text-xs md:text-base text-gray-500">
                                {t("serial")} {property.serial} | Tipo: {CATEGORY_LABEL[property.category]}
                            </p>
                        </div>

                        {/* Habitaciones */}
                        <div className="p-4 flex flex-col gap-6">
                            {property.rooms.map((room) => {
                                const currentTenants = room.leaseOrdersRoom.filter((order) => order.isActive);
                                const oldTenants = room.leaseOrdersRoom.filter((order) => !order.isActive && order.status !== "REJECTED");

                                return (
                                    <div key={room.serial}>
                                        <h3 className="text-sm md:text-lg font-semibold text-hfm-dark mb-2">
                                            {t("room")} {room.serial}
                                        </h3>
                                        <div className="w-full divide-y">
                                            {/* Inquilinos actuales */}
                                            {currentTenants.length > 0 && (
                                                <div className="pb-4">
                                                    <p className="text-sm md:text-base text-green-700 font-medium mb-1">{t("current_tenants")}</p>
                                                    <div className="flex flex-wrap w-full gap-4">
                                                        {currentTenants.map((order, i) => (
                                                            <TenantCard
                                                                key={i}
                                                                order={{
                                                                    ...order,
                                                                    category: property.category,
                                                                    roomSerial: room.serial,
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Inquilinos anteriores */}
                                            {oldTenants.length > 0 && (
                                                <div className="pt-4">
                                                    <p className="text-sm md:text-base text-gray-500 font-medium mb-1">{t("old_tenants")}</p>
                                                    <div className="flex flex-wrap w-full gap-4">
                                                        {oldTenants.map((order, i) => (
                                                            <TenantCard
                                                                key={i}
                                                                order={{
                                                                    ...order,
                                                                    category: property.category,
                                                                    roomSerial: room.serial,
                                                                }}
                                                                isOld
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </motion.div>
    );
};

export default MyTenants;
