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
        const filteredOrders = loFetch.data?.filter((lo) => lo.status === "IN_PROGRESS" || lo.status === "REJECTED");
        const optionSerials = propertiesFetch.data?.map((property) => {
            return {
                serial: property.serial,
                id: property.id,
            };
        });
        const paymentsFetch = await axios.get(`${BASE_URL}/api/admin/payments`);
        const usersWithLeaseOrderDataInPayment = addLeaseOrderToPayments(usersFetch.data, loFetch.data);
        const rooms = await axios.get(`${BASE_URL}/api/admin/room`);
        const documents = await axios.get(`${BASE_URL}/api/admin/document`);
        const rentalPeriods = await axios.get(`${BASE_URL}/api/admin/rental_period`);

        data = {
            allLeaseOrders: loFetch.data,
            leaseOrders: filteredOrders,
            leaseOrdersApproved: loFetch.data?.filter((lo) => lo.status === "PENDING" || lo.status === "APPROVED"),
            allUsers: usersWithLeaseOrderDataInPayment,
            clients: clientsFetch.data,
            properties: propertiesFetch.data,
            optionSerials,
            payments: paymentsFetch.data,
            rooms: rooms.data,
            documents: documents.data,
            rentalPeriods: rentalPeriods.data.rentalPeriods,
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
