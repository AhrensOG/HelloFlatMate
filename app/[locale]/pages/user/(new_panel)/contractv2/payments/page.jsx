import PaymentsFallback from "@/app/components/user/new_panel/contract/auxiliarComponents/fallbacks/PaymentsFallback";
import Payments from "@/app/components/user/new_panel/contract/payments/Payments";
import React, { Suspense } from "react";

const UserContractPaymentsPage = () => {
    return (
        <Suspense fallback={<PaymentsFallback />}>
            <Payments />
        </Suspense>
    );
};

export default UserContractPaymentsPage;
