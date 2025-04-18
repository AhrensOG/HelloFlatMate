import OwnerIncidences from "@/app/components/owner/new_panel/incidences/OwnerIncidences";
import React, { Suspense } from "react";

const OwnerIncidencesPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <OwnerIncidences />;
    </Suspense>
  );
};

export default OwnerIncidencesPage;
