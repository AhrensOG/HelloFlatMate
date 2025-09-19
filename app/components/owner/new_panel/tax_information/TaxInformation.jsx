"use client";

import { Context } from "@/app/context/GlobalContext";
import React, { useContext, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const YEARS_BACK = 1; // ← cambia esto si quieres incluir más años hacia atrás

const TaxInformation = () => {
  const { state } = useContext(Context);
  const currentYear = new Date().getFullYear();

  const yearOptions = useMemo(() => {
    const arr = [];
    for (let y = currentYear - YEARS_BACK; y <= currentYear; y++) arr.push(y);
    return arr;
  }, [currentYear]);

  const [year, setYear] = useState(currentYear);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    const userId = state?.user?.id || state?.user?._id;

    if (!userId) {
      toast.error("No se encontró el usuario. Inicia sesión nuevamente.");
      console.error("[Tax] userId is missing");
      return;
    }

    const tId = toast.loading("Generando informe…");
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/api/owner/new_panel/tax_information",
        { userId, year, format: "excel" },
        { responseType: "blob" }
      );

      const dispo = res.headers["content-disposition"] || "";
      const match = dispo.match(/filename="([^"]+)"/);
      const filename = match?.[1] || `Informe_Fiscal_${year}.xlsx`;

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      toast.success("Informe generado y descargado.", { id: tId });
    } catch (err) {
      let msg = "No se pudo generar el informe.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (data && typeof data === "object" && "error" in data) {
          msg = data.error || msg;
        }
      }
      console.error("[Tax] Download error:", err);
      toast.error(msg, { id: tId });
    } finally {
      setIsLoading(false);
    }
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
          <h2 className="text-sm font-medium text-gray-900 mb-2">
            Para propietarios
          </h2>
          <p className="text-sm text-gray-600">
            Podrás <span className="font-semibold">generar y descargar</span> tu
            informe fiscal en formato Excel. Primero generaremos el informe y, a
            continuación, se descargará automáticamente.
          </p>
        </div>

        {/* Controles */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end gap-3 mb-4">
          <div className="flex flex-col">
            <label htmlFor="year" className="text-sm text-gray-700 mb-1">
              Año del informe
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <span className="mt-1 text-xs text-gray-500">
              Sugerencia: desde el año pasado hasta el actual.
            </span>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {isLoading ? "Procesando…" : "Generar y descargar informe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxInformation;
