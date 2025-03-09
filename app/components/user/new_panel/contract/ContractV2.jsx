import React, { Suspense } from "react";
import ProfileForm from "./auxiliarComponents/ProfileForm";
import ProfileFormFallback from "./auxiliarComponents/fallbacks/ProfileFormFallback";

const ContractV2 = () => {
    return (
        <Suspense fallback={<ProfileFormFallback />}>
            <ProfileForm />
        </Suspense>
    );
};

export default ContractV2;
