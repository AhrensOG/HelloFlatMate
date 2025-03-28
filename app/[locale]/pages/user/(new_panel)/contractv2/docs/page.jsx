import DocsV2Fallback from "@/app/components/user/new_panel/contract/auxiliarComponents/fallbacks/DocsV2Fallback";
import DocsV2 from "@/app/components/user/new_panel/contract/docs/DocsV2";
import React, { Suspense } from "react";

const UserContractDocsPage = () => {
    return (
        <Suspense fallback={<DocsV2Fallback />}>
            <DocsV2 />
        </Suspense>
    );
};

export default UserContractDocsPage;
