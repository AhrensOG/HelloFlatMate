"use client";

import { Context } from "@/app/context/GlobalContext";
import React, { useContext, useState } from "react";

const TaxInformation = () => {
  const { state } = useContext(Context);
  const handleGenerateReport = () => {
    console.log(
      "[TaxInformation] Generar y descargar informe fiscal (pendiente de endpoint)."
    );
  };

  return (
    <div className="w-full flex flex-col items-center px-0 md:px-6 pb-10 bg-white">
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Informe fiscal
        </h1>
        <p className="text-gray-600 mb-4 text-sm">
          En este apartado puedes revisar tus informes fiscales.
        </p>

        {/* Aviso para propietario */}
        <div className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-1">
            Para propietarios
          </h2>
          <p className="text-sm text-gray-600">
            Podrás <span className="font-semibold">generar y descargar</span> tu
            informe fiscal en formato Excel o PDF. Primero generaremos el
            informe y seguidamente podrás acceder al mismo.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Generar y descargar informe
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxInformation;
