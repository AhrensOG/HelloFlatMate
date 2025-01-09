import axios from "axios";
import React from "react";
import NewAdminPanel from "./NewAdminPanel";
import SkeletonLoader from "./SkeletonLoader";

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
        const filteredOrders = loFetch.data?.filter((lo) => lo.status === "IN_PROGRESS" || lo.status === "REJECTED");

        data = {
            leaseOrders: filteredOrders,
            leaseOrdersApproved: loFetch.data?.filter((lo) => lo.status === "PENDING" || lo.status === "APPROVED"),
            allUsers: usersFetch.data,
            clients: clientsFetch.data,
            properties: propertiesFetch.data,
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
