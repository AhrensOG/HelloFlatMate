import axios from "axios";
import React from "react";
import NewAdminPanel from "./NewAdminPanel";
import SkeletonLoader from "./SkeletonLoader";
import { addLeaseOrderToPayments } from "./utils/addLeaseOrderToPayments";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function isEmpty(data) {
    if (!data) return true;
    if (Array.isArray(data)) return data.length === 0;
    if (typeof data === "object") return Object.keys(data).length === 0;
    return false;
}

const FetchDataComponent = async () => {
    let data = null;
    let error = false;

    try {
        const loFetch = await axios.get(`${BASE_URL}/api/admin/lease_order`);
        const usersFetch = await axios.get(`${BASE_URL}/api/admin/user`);
        const clientsFetch = await axios.get(`${BASE_URL}/api/admin/user?role=CLIENT`);
        const propertiesFetch = await axios.get(`${BASE_URL}/api/admin/property?simple=true`);
        const optionSerials = propertiesFetch.data?.map((property) => {
            return {
                serial: property.serial,
                id: property.id,
                rooms: property.rooms,
            };
        });
        const usersWithLeaseOrderDataInPayment = addLeaseOrderToPayments(usersFetch.data, loFetch.data);

        data = {
            allLeaseOrders: loFetch.data,
            allUsers: usersWithLeaseOrderDataInPayment,
            clients: clientsFetch.data,
            properties: propertiesFetch.data,
            optionSerials,
        };
    } catch (err) {
        console.error("Error en SSR:", err);
        error = true;
        data = null;
    }

    if (error || isEmpty(data)) {
        return <SkeletonLoader error={error} />;
    }

    return <NewAdminPanel data={data} />;
};

export default FetchDataComponent;
