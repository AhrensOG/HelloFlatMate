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
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import formatDateToDDMMYYYY from "../utils/formatDate";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function DetailedConsumptionsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProperties, setExpandedProperties] = useState(new Set());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedLease, setSelectedLease] = useState(null);

  // Estados para el Resumen Inferior
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  // 1. Navegación: Propiedades
  const { data: allProperties } = useSWR(
    "/api/admin/detailed_consumptions/properties",
    fetcher,
  );

  // 2. Resumen de Piso (Endpoint nuevo)
  const { data: propertySummary, isLoading: isLoadingSummary } = useSWR(
    selectedProperty
      ? `/api/admin/detailed_consumptions/properties/summary?propertyId=${selectedProperty.id}`
      : null,
    fetcher,
  );

  // 3. Contratos de habitación
  const { data: leases, isLoading: isLoadingLeases } = useSWR(
    selectedRoom
      ? `/api/admin/detailed_consumptions/room_leases?roomId=${selectedRoom.id}`
      : null,
    fetcher,
  );

  // 4. Detalles financieros del contrato seleccionado
  const { data: financialData, isLoading: isLoadingFinancials } = useSWR(
    selectedLease
      ? `/api/admin/detailed_consumptions/details?clientId=${selectedLease.clientId}&leaseOrderId=${selectedLease.id}`
      : null,
    fetcher,
  );

  useEffect(() => {
    setSelectedLease(null);
  }, [selectedRoom]);

  const financialSummary = useMemo(() => {
    if (!financialData) return null;
    const periods = ["1Q", "2Q"];
    return periods.map((p) => {
      const periodSupplies =
        financialData.supplies?.filter((s) => s.name?.includes(p)) || [];
      const hasSupply = periodSupplies.length > 0;
      const periodConsumptions =
        financialData.consumptions?.filter((c) => c.period === p) || [];
      const totalAportado = periodSupplies.reduce(
        (acc, s) => acc + (s.status === "PAID" ? Number(s.amount) : 0),
        0,
      );
      const totalConsumido = periodConsumptions.reduce(
        (acc, c) => acc + Number(c.amount),
        0,
      );
      return {
        period: p,
        hasSupply,
        supplies: periodSupplies,
        consumptions: periodConsumptions,
        totalAportado,
        totalConsumido,
        balance: totalAportado - totalConsumido,
        isPending: !!periodSupplies.find((s) => s.status === "PENDING"),
      };
    });
  }, [financialData]);

  const filteredProperties = useMemo(() => {
    if (!allProperties) return [];
    const query = searchQuery.toLowerCase();
    return allProperties.filter(
      (p) =>
        p.serial?.toLowerCase().includes(query) ||
        p.rooms?.some((r) => r.serial?.toLowerCase().includes(query)),
    );
  }, [searchQuery, allProperties]);

  const toggleProperty = (id, p) => {
    const next = new Set(expandedProperties);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedProperties(next);
    setSelectedProperty(p); // Al expandir, seteamos la propiedad para el resumen
  };

  return (
    <div className="relative flex h-screen w-full bg-gray-100 overflow-hidden font-sans text-sm">
      {/* SECCIÓN SUPERIOR: 3 COLUMNAS */}
      <div
        className={`flex w-full transition-all duration-500 ${showSummary ? "h-[55vh]" : "h-full"}`}>
        {/* COL 1: PROPIEDADES */}
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
            {filteredProperties
            .sort((a, b) => a.serial.localeCompare(b.serial))
            .map((p) => (
              <div key={p.id} className="rounded-lg">
                <div
                  onClick={() => toggleProperty(p.id, p)}
                  className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg ${selectedProperty?.id === p.id ? "bg-blue-50/50" : ""}`}>
                  <div className="flex items-center gap-3">
                    <HomeIcon
                      className={`size-5 ${selectedProperty?.id === p.id ? "text-blue-600" : "text-gray-400"}`}
                    />
                    <span className="font-bold text-gray-700">{p.serial}</span>
                  </div>
                  <ChevronDownIcon
                    className={`size-4 transition-transform ${expandedProperties.has(p.id) ? "rotate-180" : ""}`}
                  />
                </div>
                {expandedProperties.has(p.id) &&
                  [...p.rooms]
                    .sort((a, b) =>
                      a.serial.localeCompare(b.serial, undefined, {
                        numeric: true,
                      }),
                    )
                    .map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRoom(r)}
                        className={`ml-8 mr-2 my-1 p-2 cursor-pointer rounded-md flex items-center gap-2 ${selectedRoom?.id === r.id ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-600"}`}>
                        <TagIcon className="size-3" />
                        <span>Habitación {r.serial}</span>
                      </div>
                    ))}
              </div>
            ))}
          </div>
        </div>

        {/* COL 2: CONTRATOS */}
        <div className="w-[30%] flex flex-col border-r bg-gray-50/50 z-20">
          <div className="p-6 bg-white border-b min-h-[131px]">
            <h3 className="font-bold text-gray-800 uppercase text-lg tracking-widest mb-4">
              Contratos
            </h3>
            <p className="text-gray-500 truncate italic text-lg">
              {selectedRoom
                ? `Habitación ${selectedRoom.serial}`
                : "Seleccione habitación"}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoadingLeases ? (
              <div className="p-4 bg-white rounded-xl animate-pulse h-20" />
            ) : (
              leases?.map((l) => {
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
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all bg-white shadow-sm ${selectedLease?.id === l.id ? "border-blue-600 ring-1 ring-blue-600" : "border-transparent hover:border-gray-300"}`}>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${l.status === "APPROVED" ? (isFuture ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700") : "bg-gray-100 text-gray-500"}`}>
                      {statusLabel}
                    </span>
                    <p className="font-bold text-gray-800 mt-2">
                      {formatDateToDDMMYYYY(l.startDate)} —{" "}
                      {formatDateToDDMMYYYY(l.endDate)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* COL 3: DETALLE FINANCIERO */}
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

      {/* PANEL INFERIOR: RESUMEN CONSOLIDADO */}
      <div
        className={`fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-15px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 z-50 ${showSummary ? "h-[45vh]" : "h-12"}`}>
        {/* Cabecera del Drawer */}
        <div
          onClick={() => setShowSummary(!showSummary)}
          className="h-12 bg-gray-900 text-white px-8 flex justify-between items-center cursor-pointer hover:bg-black transition-colors">
          <div className="flex items-center gap-4">
            <TableCellsIcon
              className={`size-5 ${selectedProperty ? "text-blue-400" : "text-gray-600"}`}
            />
            <span className="font-black uppercase tracking-widest text-[11px]">
              {selectedProperty
                ? `Resumen Consolidado: ${selectedProperty.serial}`
                : "Seleccione una propiedad para comparar"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isLoadingSummary && (
              <div className="size-4 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
            )}
            <span className="text-[10px] font-bold opacity-50 uppercase">
              {showSummary ? "Minimizar" : "Expandir Resumen"}
            </span>
            <ChevronDownIcon
              className={`size-4 transition-transform duration-500 ${showSummary ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {/* Contenido de la Tabla Excel */}
        <div className="h-full w-full overflow-y-auto pr-16 pl-2 py-2 pb-14 bg-white">
          {!selectedProperty ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-300">
              <HomeIcon className="size-12 mb-2 opacity-20" />
              <p className="font-medium">
                Selecciona un piso en la lista lateral
              </p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase tracking-tighter font-black">
                  <tr>
                    <th className="px-4 py-3 text-center w-12">H</th>
                    <th className="px-4 py-3">Huésped</th>
                    <th className="px-4 py-3 text-center">Días</th>
                    <th className="px-4 py-3 text-center">Eur/Día</th>
                    <th className="px-4 py-3 text-center">Entrada</th>
                    <th className="px-4 py-3 text-center">Salida</th>
                    <th className="px-4 py-3 text-right">Gastos</th>
                    <th className="px-4 py-3 text-right">Adelanto</th>
                    <th className="px-4 py-3 text-right pr-6">Diferencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {propertySummary
                    ?.sort((a, b) =>
                      a.serial.localeCompare(b.serial, undefined, {
                        numeric: true,
                      }),
                    )
                    .map((room) => {
                      const lease = room.activeLease;
                      if (!lease)
                        return (
                          <tr key={room.id} className="text-gray-300">
                            <td className="px-4 py-3 text-center font-bold bg-gray-50/50">
                              {room.serial.split("R").pop()}
                            </td>
                            <td
                              colSpan={8}
                              className="px-4 py-3 italic text-center text-[10px]">
                              Sin contrato activo
                            </td>
                          </tr>
                        );

                      const start = new Date(lease.startDate);
                      const end = new Date(lease.endDate);
                      const dias = Math.max(
                        1,
                        Math.ceil((end - start) / (1000 * 60 * 60 * 24)),
                      );
                      const gastos =
                        lease.consumptions?.reduce(
                          (acc, c) => acc + Number(c.amount),
                          0,
                        ) || 0;
                      const adelanto =
                        lease.supplies?.reduce(
                          (acc, s) =>
                            acc + (s.status === "PAID" ? Number(s.amount) : 0),
                          0,
                        ) || 0;
                      const diferencia = adelanto - gastos;

                      return (
                        <tr
                          key={room.id}
                          className={`hover:bg-blue-50/50 transition-colors ${selectedRoom?.id === room.id ? "bg-blue-50/80 ring-1 ring-inset ring-blue-200" : ""}`}>
                          <td className="px-4 py-3 text-center font-black text-blue-600 bg-blue-50/30">
                            R{room.serial.split("R").pop()}
                          </td>
                          <td className="px-4 py-3 font-bold text-gray-700">
                            {lease.client?.name} {lease.client?.lastName || ""}
                          </td>
                          <td className="px-4 py-3 text-center font-mono">
                            {dias}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-gray-400">
                            €{(gastos / dias).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-500">
                            {formatDateToDDMMYYYY(lease.startDate)}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-500">
                            {formatDateToDDMMYYYY(lease.endDate)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-red-500">
                            €{gastos.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-green-600">
                            €{adelanto.toFixed(2)}
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-black pr-6 ${diferencia >= 0 ? "text-blue-700" : "text-orange-600"}`}>
                            €{diferencia.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
