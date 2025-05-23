import FilterPageComponent from "@/app/components/public/filter-page/FilterPageComponent";
import React, { Suspense } from "react";

const FilterPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <FilterPageComponent />
    </Suspense>
  );
};

export default FilterPage;
