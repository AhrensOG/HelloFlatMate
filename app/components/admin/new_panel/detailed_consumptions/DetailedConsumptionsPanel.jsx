import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  TagIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ClockIcon,
  CreditCardIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import formatDateToDDMMYYYY from "../utils/formatDate";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DetailedConsumptionsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProperties, setExpandedProperties] = useState(new Set());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedLease, setSelectedLease] = useState(null);

  const { data: allProperties, isLoading: isLoadingProps } = useSWR(
    "/api/admin/detailed_consumptions/properties",
    fetcher
  );

  const { data: leases, isLoading: isLoadingLeases } = useSWR(
    selectedRoom
      ? `/api/admin/detailed_consumptions/room_leases?roomId=${selectedRoom.id}`
      : null,
    fetcher
  );

  const { data: financialData, isLoading: isLoadingFinancials } = useSWR(
    selectedLease
      ? `/api/admin/detailed_consumptions/details?clientId=${selectedLease.clientId}&leaseOrderId=${selectedLease.id}`
      : null,
    fetcher
  );

  useEffect(() => {
    setSelectedLease(null);
  }, [selectedRoom]);

  const financialSummary = useMemo(() => {
    if (!financialData) return null;

    const periods = ["1Q", "2Q"];
    const summary = periods.map((p) => {
      const periodSupplies =
        financialData.supplies?.filter((s) => s.name?.includes(p)) || [];

      // Verificamos si existe al menos un suministro para este período
      const hasSupply = periodSupplies.length > 0;

      const periodConsumptions =
        financialData.consumptions?.filter((c) => c.period === p) || [];

      const totalAportado = periodSupplies.reduce(
        (acc, s) => acc + (s.status === "PAID" ? Number(s.amount) : 0),
        0
      );
      const totalConsumido = periodConsumptions.reduce(
        (acc, c) => acc + Number(c.amount),
        0
      );
      const pendingSupply = periodSupplies.find((s) => s.status === "PENDING");

      return {
        period: p,
        hasSupply, // Nuevo flag
        supplies: periodSupplies,
        consumptions: periodConsumptions,
        totalAportado,
        totalConsumido,
        balance: totalAportado - totalConsumido,
        isPending: !!pendingSupply,
      };
    });

    return summary;
  }, [financialData]);

  const filteredProperties = useMemo(() => {
    if (!allProperties) return [];
    const query = searchQuery.toLowerCase();
    return allProperties.filter(
      (p) =>
        p.serial?.toLowerCase().includes(query) ||
        p.rooms?.some((r) => r.serial?.toLowerCase().includes(query))
    );
  }, [searchQuery, allProperties]);

  const toggleProperty = (id) => {
    const next = new Set(expandedProperties);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedProperties(next);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden font-sans text-sm">
      {/* COL 1 (30%): PROPIEDADES */}
      <div className="w-[30%] flex flex-col border-r bg-white shadow-sm z-30">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">
            Propiedades
          </h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full border rounded-lg pl-10 pr-4 py-2 bg-gray-50 outline-none focus:ring-2 ring-blue-500/20 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredProperties.map((p) => (
            <div key={p.id} className="rounded-lg">
              <div
                onClick={() => toggleProperty(p.id)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <HomeIcon className="size-5 text-blue-600" />
                  <span className="font-bold text-gray-700">{p.serial}</span>
                </div>
                <ChevronDownIcon
                  className={`size-4 transition-transform ${
                    expandedProperties.has(p.id) ? "rotate-180" : ""
                  }`}
                />
              </div>
              {expandedProperties.has(p.id) &&
                [...p.rooms]
                  .sort((a, b) =>
                    a.serial.localeCompare(b.serial, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    })
                  )
                  .map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRoom(r)}
                      className={`ml-8 mr-2 my-1 p-2 cursor-pointer rounded-md flex items-center gap-2 ${
                        selectedRoom?.id === r.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-50 text-gray-600"
                      }`}>
                      <TagIcon className="size-3" />{" "}
                      <span>Habitación {r.serial}</span>
                    </div>
                  ))}
            </div>
          ))}
        </div>
      </div>

      {/* COL 2 (30%): CONTRATOS */}
      <div className="w-[30%] flex flex-col border-r bg-gray-50/50 z-20">
        <div className="p-6 bg-white border-b min-h-[131px]">
          <h3 className="font-bold text-gray-800 uppercase text-lg tracking-widest mb-4">
            Detalle de Contratos
          </h3>
          <p className="text-gray-500 truncate italic text-lg">
            {selectedRoom
              ? `Habitacion ${selectedRoom.serial}`
              : "Seleccione habitación"}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoadingLeases ? (
            <div className="p-4 bg-white rounded-xl animate-pulse h-20" />
          ) : (
            leases?.map((l) => {
              // Lógica de etiqueta dinámico (Actual vs Próximo)
              const isFuture = new Date(l.startDate) > new Date();
              const statusLabel =
                l.status === "APPROVED"
                  ? isFuture
                    ? "Próximo"
                    : "Actual"
                  : "Finalizado";

              return (
                <div
                  key={l.id}
                  onClick={() => setSelectedLease(l)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all bg-white shadow-sm ${
                    selectedLease?.id === l.id
                      ? "border-blue-600 ring-1 ring-blue-600"
                      : "border-transparent hover:border-gray-300"
                  }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        l.status === "APPROVED"
                          ? isFuture
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                      {statusLabel}
                    </span>
                  </div>
                  <p className="font-bold text-gray-800">
                    {formatDateToDDMMYYYY(l.startDate)} —{" "}
                    {formatDateToDDMMYYYY(l.endDate)}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* COL 3 (40%): DETALLE Y CÁLCULOS */}
      <div className="w-[40%] flex flex-col bg-white overflow-y-auto">
        {!selectedLease ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 p-10 text-center opacity-40">
            <InformationCircleIcon className="size-16 mb-4" />
            <p className="text-lg font-bold">Resumen Financiero</p>
            <p>
              Seleccione un contrato para ver aportes y consumos por período.
            </p>
          </div>
        ) : isLoadingFinancials ? (
          <div className="p-8 animate-pulse space-y-6">
            <div className="h-20 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
          </div>
        ) : (
          <div className="flex-1 p-8 space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
              <UserCircleIcon className="size-12 text-blue-400" />
              <div>
                <h3 className="text-lg font-black tracking-tight">
                  {financialData.name}{" "}
                  {financialData.lastName ? financialData.lastName : ""}
                </h3>
                <p className="text-blue-300 text-lg opacity-80">
                  {financialData.email}
                </p>
              </div>
            </div>

            {financialSummary?.map((sum) => (
              <div
                key={sum.period}
                className={`border rounded-3xl overflow-hidden shadow-sm ${
                  !sum.hasSupply
                    ? "border-gray-200 bg-gray-50 opacity-60"
                    : "border-gray-100"
                }`}>
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <h4 className="font-black text-gray-700 uppercase">
                    PERÍODO {sum.period}
                  </h4>
                  {sum.hasSupply ? (
                    sum.isPending ? (
                      <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold">
                        <ExclamationCircleIcon className="size-3" /> APORTE
                        PENDIENTE
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold">
                        <CheckCircleIcon className="size-3" /> APORTE REALIZADO
                      </div>
                    )
                  ) : (
                    <div className="text-[10px] font-bold text-gray-400">
                      SIN APORTE CARGADO
                    </div>
                  )}
                </div>

                {sum.hasSupply ? (
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-white border border-gray-100 rounded-xl">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Aportado
                        </p>
                        <p className="text-lg font-black text-gray-800">
                          €{sum.totalAportado.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 bg-white border border-gray-100 rounded-xl">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Consumido
                        </p>
                        <p className="text-lg font-black text-gray-800">
                          €{sum.totalConsumido.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl flex justify-between items-center ${
                        sum.balance >= 0
                          ? "bg-blue-600 text-white"
                          : "bg-red-600 text-white"
                      }`}>
                      <span className="font-bold text-xs uppercase tracking-widest opacity-80">
                        Balance
                      </span>
                      <span className="text-2xl font-black">
                        €{sum.balance.toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2 mt-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-1">
                        Desglose Consumos
                      </p>
                      {sum.consumptions.length > 0 ? (
                        sum.consumptions.map((c, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-start group py-2 border-b border-gray-50 last:border-none">
                            <div className="flex gap-2">
                              <ArrowTrendingDownIcon className="size-3 text-red-400 mt-0.5" />
                              <div className="flex flex-col">
                                <span className="font-bold text-gray-700 text-xs uppercase">
                                  {c.type}
                                </span>
                                <span className="text-xs text-gray-600">
                                  {formatDateToDDMMYYYY(c.startDate)} —{" "}
                                  {formatDateToDDMMYYYY(c.endDate)}
                                </span>
                                {c.url && (
                                  <a
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 font-bold hover:underline">
                                    Ver Factura
                                  </a>
                                )}
                              </div>
                            </div>
                            <span className="font-bold text-red-600 whitespace-nowrap">
                              - €{Number(c.amount).toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-[10px] text-gray-400 py-2">
                          Sin consumos cargados
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center flex flex-col items-center">
                    <CreditCardIcon className="size-8 text-gray-300 mb-2" />
                    <p className="text-gray-400 font-medium italic">
                      No se ha registrado aporte para el período {sum.period}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
