"use client";
import ThankYou from "@/app/components/user/thank_you/ThankYou";
import React, { Suspense } from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full flex justify-center h-[70vh] animate-pulse">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-sm">
        <div className="grow flex flex-col items-center justify-center gap-8">
          {/* Placeholder for Image */}
          <div className="w-[130px] h-[130px] bg-gray-300 rounded-full"></div>

          {/* Placeholder for Title and Subtitle */}
          <div className="text-center">
            <div className="h-6 bg-gray-300 rounded mb-2 w-48 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>

          {/* Placeholder for Body */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mt-2"></div>
          </div>
        </div>

        {/* Placeholder for Button */}
        <div className="flex items-end w-full p-2">
          <div className="h-[3rem] bg-gray-400 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

const SuccessPage = ({ params }) => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ThankYou id={params.id} />
    </Suspense>
  );
};

export default SuccessPage;
