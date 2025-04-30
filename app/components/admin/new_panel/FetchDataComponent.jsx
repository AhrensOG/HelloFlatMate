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
    return <NewAdminPanel />;
};

export default FetchDataComponent;
