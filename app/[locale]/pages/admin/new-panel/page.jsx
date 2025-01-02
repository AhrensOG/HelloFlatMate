import FetchDataComponent from "@/app/components/admin/new_panel/FetchDataComponent";
import NewAdminPanel from "@/app/components/admin/new_panel/NewAdminPanel";
import SkeletonLoader from "@/app/components/admin/new_panel/SkeletonLoader";
import React, { Suspense } from "react";

const NewAdminPanelPage = async () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <FetchDataComponent />
    </Suspense>
  );
};

export default NewAdminPanelPage;
