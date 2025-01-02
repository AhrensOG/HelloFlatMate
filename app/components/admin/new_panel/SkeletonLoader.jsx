"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";

const SkeletonLoader = ({ error = false }) => {
  if (error) {
    toast.info("¡Ups! Ocurrió un error", {
      description: "Recarga la pagina o contacta al soporte.",
    });
  }

  return (
    <div className="h-screen bg-white flex flex-row animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="w-16 bg-white h-full flex-shrink-0 flex flex-col items-center py-4 space-y-6">
        {/* Sidebar Items */}
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col h-screen justify-between">
        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col p-6 space-y-6 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>

          <div className="h-12 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>

          <div className="h-12 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
