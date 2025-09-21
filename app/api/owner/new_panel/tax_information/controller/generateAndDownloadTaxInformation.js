// app/api/reports/tax/controller/generateAndDownloadTaxInformation.js
import { NextResponse } from "next/server";
import {
  Property,
  Room,
  LeaseOrderRoom,
  Client,
  RentPayment,
  Owner,
  Incidence,
} from "@/db/init";
import ExcelJS from "exceljs";

class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export async function generateAndDownloadTaxInformation(req) {
  try {
    // ─────────────────────────────────────────────────────────────
    // 1) Parseo del body (se mantiene inline)
    // ─────────────────────────────────────────────────────────────
    let payload = {};
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { error: "El cuerpo de la petición debe ser JSON válido." },
        { status: 400 }
      );
    }

    const { userId, year, format = "excel" } = payload || {};
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "El campo 'userId' es requerido y debe ser string." },
        { status: 400 }
      );
    }
    const targetYear = Number(year) || new Date().getFullYear();
    if (format !== "excel") {
      return NextResponse.json(
        { error: "Por ahora solo se admite format='excel'." },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // 2) Query a la DB (función auxiliar)
    // ─────────────────────────────────────────────────────────────
    const property = await fetchPropertyTreeOrThrow(userId);

    // ─────────────────────────────────────────────────────────────
    // 3) Cálculo/normalización (función auxiliar)
    // ─────────────────────────────────────────────────────────────
    const {
      months,
      roomRows,
      monthlyTotals,
      monthlyMgmtFees,
      monthlyNet,
      monthlyMaintenance,
      monthlyNetFinal,
      totalRentas,
      totalGestion,
      totalMaintenance,
      totalNetaMes,
      totalNetaFinal,
    } = computeMonthlyReport(property, targetYear);

    // ─────────────────────────────────────────────────────────────
    // 4) Construcción y respuesta Excel (función auxiliar)
    // ─────────────────────────────────────────────────────────────
    const res = await buildExcelAndResponse({
      property,
      targetYear,
      months,
      roomRows,
      monthlyTotals,
      monthlyMgmtFees,
      monthlyNet,
      monthlyMaintenance,
      monthlyNetFinal,
      totalRentas,
      totalGestion,
      totalMaintenance,
      totalNetaMes,
      totalNetaFinal,
    });

    return res;
  } catch (error) {
    console.error("[Tax] Error en generateAndDownloadTaxInformation:", error);
    const status = error?.status ?? 500;
    const message = error?.message ?? "Error interno del servidor.";
    return NextResponse.json({ error: message }, { status });
  }
}

/* ────────────────────────────────────────────────────────────────
 * Auxiliar 1: Query DB (Property → rooms → leaseOrdersRoom → client → rentPayments)
 * Lanza ApiError(404) si no encuentra property.
 * ──────────────────────────────────────────────────────────────── */
async function fetchPropertyTreeOrThrow(ownerId) {
  const propertyInstance = await Property.findOne({
    attributes: ["id", "serial", "street", "streetNumber", "floor", "category"],
    where: { ownerId },
    include: [
      {
        model: Room,
        as: "rooms",
        attributes: ["id", "serial", "isActive", "amountHelloflatmate"],
        include: [
          {
            model: LeaseOrderRoom,
            as: "leaseOrdersRoom",
            attributes: [
              "id",
              "startDate",
              "endDate",
              "date",
              "price",
              "status",
              "isActive",
            ],
            include: [
              {
                model: Client,
                as: "client",
                attributes: ["id"],
                include: [
                  {
                    model: RentPayment,
                    as: "rentPayments",
                    attributes: [
                      "amount",
                      "date",
                      "status",
                      "type",
                      "paymentId",
                      "leaseOrderId",
                      "description",
                      "quotaNumber", // ← clave para mapeo Mes ↔ Cuota
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        model: Owner,
        as: "owner",
        attributes: ["name", "lastName"],
      },
      {
        model: Incidence,
        as: "incidences",
        attributes: ["id", "amount", "date"],
      },
    ],
  });

  if (!propertyInstance) {
    throw new ApiError(
      "No se encontró ninguna propiedad para este propietario.",
      404
    );
  }

  return propertyInstance.toJSON();
}

/* ────────────────────────────────────────────────────────────────
 * Auxiliar 2: Cálculo y normalización por meses (Ene–Dic)
 * Aplica reglas:
 *  - Solo pagos APPROVED
 *  - Mes ↔ cuota via quotaNumber relativo al startDate
 *  - FRA GESTION HFM: amountHelloflatmate por room en meses cubiertos
 * Devuelve estructura lista para Excel.
 * ──────────────────────────────────────────────────────────────── */
function computeMonthlyReport(property, targetYear) {
  const months = [
    { label: "Enero", num: 1 },
    { label: "Febrero", num: 2 },
    { label: "Marzo", num: 3 },
    { label: "Abril", num: 4 },
    { label: "Mayo", num: 5 },
    { label: "Junio", num: 6 },
    { label: "Julio", num: 7 },
    { label: "Agosto", num: 8 },
    { label: "Septiembre", num: 9 },
    { label: "Octubre", num: 10 },
    { label: "Noviembre", num: 11 },
    { label: "Diciembre", num: 12 },
  ];

  // Helpers
  const startOfMonth = (y, m) => new Date(Date.UTC(y, m - 1, 1));
  const endOfMonth = (y, m) => new Date(Date.UTC(y, m, 0, 23, 59, 59, 999));
  const parseUTC = (d) => (d ? new Date(d) : null);
  const monthsBetweenInclusiveIndex = (start, current) => {
    const sY = start.getUTCFullYear();
    const sM = start.getUTCMonth(); // 0-11
    const cY = current.getUTCFullYear();
    const cM = current.getUTCMonth();
    return (cY - sY) * 12 + (cM - sM) + 1; // cuota esperada (quotaNumber)
  };
  const monthInRangeOfLease = (y, m, startDate, endDate) => {
    const monthStart = startOfMonth(y, m);
    const monthEnd = endOfMonth(y, m);
    const s = parseUTC(startDate);
    const e = parseUTC(endDate);
    if (!s || !e) return false;
    return !(monthEnd < s || monthStart > e);
  };

  const rooms = Array.isArray(property.rooms) ? property.rooms : [];

  // Acumuladores comunes
  const monthlyTotals = new Array(12).fill(0); // TOTAL RENTAS
  const monthlyMgmtFees = new Array(12).fill(0); // FRA GESTION HFM
  const roomRows = [];

  // ─────────────────────────────────────────────────────────
  // RAMA ESPECIAL: HELLO_LANDLORD → solo primer mes (cuota 1)
  // ─────────────────────────────────────────────────────────
  if (property.category === "HELLO_LANDLORD") {
    for (const room of rooms) {
      const rowValues = new Array(12).fill(0);
      const amountHF = Number(room.amountHelloflatmate || 0);
      const orders = Array.isArray(room.leaseOrdersRoom)
        ? room.leaseOrdersRoom
        : [];

      for (const order of orders) {
        const s = parseUTC(order.startDate);
        if (!s) continue;

        // Solo cuenta si el mes de inicio cae en el año target
        if (s.getUTCFullYear() !== targetYear) continue;
        const startMonthIdx = s.getUTCMonth(); // 0..11

        // Sumar pagos APPROVED cuota 1 de esta lease
        const payments = Array.isArray(order?.client?.rentPayments)
          ? order.client.rentPayments
          : [];
        const firstQuotaApprovedAmount = payments
          .filter(
            (p) =>
              p?.leaseOrderId === order.id &&
              p?.status === "APPROVED" &&
              Number(p?.quotaNumber) === 1
          )
          .reduce((acc, p) => acc + Number(p.amount || 0), 0);

        // Rentas del mes de inicio
        rowValues[startMonthIdx] += firstQuotaApprovedAmount;

        // FRA GESTION HFM solo en ese mes de inicio
        monthlyMgmtFees[startMonthIdx] += amountHF;
      }

      // Totales
      for (let i = 0; i < 12; i++) {
        monthlyTotals[i] += rowValues[i];
      }

      roomRows.push({
        roomSerial: room.serial ?? `Room-${room.id}`,
        months: rowValues,
        total: rowValues.reduce((a, n) => a + n, 0),
      });
    }

    // RENTA NETA MES (aquí “MES” = realmente sólo habrá valores en meses de inicio)
    const monthlyNet = monthlyTotals.map((v, i) => v - monthlyMgmtFees[i]);

    // Mantenimiento por mes (igual que antes)
    const monthlyMaintenance = new Array(12).fill(0);
    const incidences = Array.isArray(property.incidences)
      ? property.incidences
      : [];
    for (const inc of incidences) {
      const d = inc?.date ? new Date(inc.date) : null;
      const amt = Number(inc?.amount || 0);
      if (!d || isNaN(amt)) continue;
      if (d.getUTCFullYear() !== targetYear) continue;
      monthlyMaintenance[d.getUTCMonth()] += amt;
    }

    // RENTA NETA FINAL
    const monthlyNetFinal = monthlyNet.map((v, i) => v - monthlyMaintenance[i]);

    const totalRentas = monthlyTotals.reduce((a, n) => a + n, 0);
    const totalGestion = monthlyMgmtFees.reduce((a, n) => a + n, 0);
    const totalMaintenance = monthlyMaintenance.reduce((a, n) => a + n, 0);
    const totalNetaMes = monthlyNet.reduce((a, n) => a + n, 0);
    const totalNetaFinal = monthlyNetFinal.reduce((a, n) => a + n, 0);

    return {
      months,
      roomRows,
      monthlyTotals,
      monthlyMgmtFees,
      monthlyNet, // “MES” pero con valores solo en inicios
      monthlyMaintenance,
      monthlyNetFinal,
      totalRentas,
      totalGestion,
      totalMaintenance,
      totalNetaMes,
      totalNetaFinal,
    };
  }

  // ─────────────────────────────────────────────────────────
  // RAMA GENERAL (no HELLO_LANDLORD) → lógica mensual completa
  // ─────────────────────────────────────────────────────────
  for (const room of rooms) {
    const rowValues = new Array(12).fill(0);
    const amountHF = Number(room.amountHelloflatmate || 0);
    const orders = Array.isArray(room.leaseOrdersRoom)
      ? room.leaseOrdersRoom
      : [];
    const roomCoversMonth = new Array(12).fill(false);

    for (const order of orders) {
      const s = parseUTC(order.startDate);
      const e = parseUTC(order.endDate);
      if (!s || !e) continue;

      const payments = Array.isArray(order?.client?.rentPayments)
        ? order.client.rentPayments
        : [];
      const approvedByQuota = new Map(); // quotaNumber -> sum(amount)
      for (const p of payments) {
        if (p?.status === "APPROVED" && p?.leaseOrderId === order.id) {
          const q = Number(p.quotaNumber || 0);
          const amt = Number(p.amount || 0);
          if (q > 0)
            approvedByQuota.set(q, (approvedByQuota.get(q) || 0) + amt);
        }
      }

      for (let i = 0; i < 12; i++) {
        const m = months[i].num;
        if (!monthInRangeOfLease(targetYear, m, s, e)) continue;

        roomCoversMonth[i] = true;

        const currentMonthStart = startOfMonth(targetYear, m);
        const startAligned = startOfMonth(
          s.getUTCFullYear(),
          s.getUTCMonth() + 1
        );
        const expectedQuota = monthsBetweenInclusiveIndex(
          startAligned,
          currentMonthStart
        );

        const paid = Number(approvedByQuota.get(expectedQuota) || 0);
        rowValues[i] += paid;
      }
    }

    for (let i = 0; i < 12; i++) {
      monthlyTotals[i] += rowValues[i];
      if (roomCoversMonth[i]) monthlyMgmtFees[i] += amountHF;
    }

    roomRows.push({
      roomSerial: room.serial ?? `Room-${room.id}`,
      months: rowValues,
      total: rowValues.reduce((a, n) => a + n, 0),
    });
  }

  const monthlyNet = monthlyTotals.map((v, i) => v - monthlyMgmtFees[i]);

  const monthlyMaintenance = new Array(12).fill(0);
  const incidences = Array.isArray(property.incidences)
    ? property.incidences
    : [];
  for (const inc of incidences) {
    const d = inc?.date ? new Date(inc.date) : null;
    const amt = Number(inc?.amount || 0);
    if (!d || isNaN(amt)) continue;
    if (d.getUTCFullYear() !== targetYear) continue;
    monthlyMaintenance[d.getUTCMonth()] += amt;
  }

  const monthlyNetFinal = monthlyNet.map((v, i) => v - monthlyMaintenance[i]);

  const totalRentas = monthlyTotals.reduce((a, n) => a + n, 0);
  const totalGestion = monthlyMgmtFees.reduce((a, n) => a + n, 0);
  const totalMaintenance = monthlyMaintenance.reduce((a, n) => a + n, 0);
  const totalNetaMes = monthlyNet.reduce((a, n) => a + n, 0);
  const totalNetaFinal = monthlyNetFinal.reduce((a, n) => a + n, 0);

  return {
    months,
    roomRows,
    monthlyTotals,
    monthlyMgmtFees,
    monthlyNet,
    monthlyMaintenance,
    monthlyNetFinal,
    totalRentas,
    totalGestion,
    totalMaintenance,
    totalNetaMes,
    totalNetaFinal,
  };
}

/* ────────────────────────────────────────────────────────────────
 * Auxiliar 3: Construcción del Excel y NextResponse
 * ──────────────────────────────────────────────────────────────── */
async function buildExcelAndResponse({
  property,
  targetYear,
  months,
  roomRows,
  monthlyTotals,
  monthlyMgmtFees,
  monthlyNet, // RENTA NETA MES (antes de mantenimiento)
  monthlyMaintenance, // Mantenimiento (sumado por mes)
  monthlyNetFinal, // RENTA NETA (después de mantenimiento)
  totalRentas,
  totalGestion,
  totalMaintenance,
  totalNetaMes,
  totalNetaFinal,
}) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "HFM";
  const ws = wb.addWorksheet("Informe fiscal");

  // Título: "<calle> <número> <piso> - <Nombre Apellido> — <año>"
  const addressParts = [
    property.street,
    property.streetNumber,
    property.floor,
  ].filter(Boolean);
  const address = addressParts.join(" ").trim();
  const ownerName = [property?.owner?.name, property?.owner?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const title = `${address} - ${ownerName} — ${targetYear}`;

  ws.addRow([title]);
  ws.mergeCells(1, 1, 1, 15); // 15 columnas: 1 label + 12 meses + Total + Etiqueta
  ws.getRow(1).font = { bold: true, size: 12 };
  ws.getRow(1).alignment = { vertical: "middle", horizontal: "left" };

  // Header
  const header = [
    "Habitación",
    ...months.map((m) => m.label),
    "Total",
    "Detalle",
  ];
  ws.addRow(header);
  ws.getRow(2).font = { bold: true };
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 2 }];
  ws.properties.defaultRowHeight = 18;

  ws.columns = [
    { key: "room", width: 28 },
    ...months.map(() => ({ width: 12 })),
    { key: "total", width: 14 },
    { key: "tag", width: 22 },
  ];

  // Etiqueta de cada room: "<calle nº piso> <últimos 2 del serial>"
  const addressBase = [property.street, property.streetNumber, property.floor]
    .filter(Boolean)
    .join(" ")
    .trim();

  for (const r of roomRows) {
    const suffix =
      String(r.roomSerial || "")
        .replace(/\s+/g, "")
        .slice(-2) || r.roomSerial;
    const label = `${addressBase} ${suffix}`.trim();
    const row = [label, ...r.months.map((n) => Number(n) || 0), r.total, ""];
    ws.addRow(row);
  }

  // Fila separadora
  ws.addRow([]);

  // Totales superiores
  const totalRentasRowIndex = ws.lastRow.number + 1;
  ws.addRow([
    "TOTAL RENTAS",
    ...monthlyTotals,
    totalRentas,
    "RENTAS INQUILINOS",
  ]);
  ws.getRow(totalRentasRowIndex).font = { bold: true };

  const fraRowIndex = ws.lastRow.number + 1;
  ws.addRow([
    "FRA GESTION HFM",
    ...monthlyMgmtFees,
    totalGestion,
    "FRAS DE GESTION",
  ]);
  ws.getRow(fraRowIndex).font = { bold: true };

  const netaMesRowIndex = ws.lastRow.number + 1;
  ws.addRow(["RENTA NETA MES", ...monthlyNet, totalNetaMes, "RENTAS NETAS"]);
  ws.getRow(netaMesRowIndex).font = { bold: true };

  // Fila separadora
  ws.addRow([]);

  // ——————————————————————————————————————————————————————
  // MANTENIMIENTO (detallado por incidencia y mes) — SIEMPRE visible
  // ——————————————————————————————————————————————————————
  const incidences = Array.isArray(property.incidences)
    ? property.incidences
    : [];
  const parseUTC = (d) => (d ? new Date(d) : null);

  // Agrupar incidencias del targetYear por mes 0..11
  const incByMonth = Array.from({ length: 12 }, () => []);
  for (const inc of incidences) {
    const d = parseUTC(inc.date);
    const amt = Number(inc.amount || 0);
    if (!d || isNaN(amt)) continue;
    if (d.getUTCFullYear() !== targetYear) continue;
    const mIndex = d.getUTCMonth(); // 0..11
    incByMonth[mIndex].push({ date: d, amount: amt });
  }
  // Ordenar por fecha dentro de cada mes
  for (let i = 0; i < 12; i++) incByMonth[i].sort((a, b) => a.date - b.date);

  const euroFmt = '#,##0.00" €"';
  const hasAnyIncidence = incByMonth.some((arr) => arr.length > 0);

  if (hasAnyIncidence) {
    // Hay incidencias: una fila por incidencia, en su columna de mes
    for (let i = 0; i < 12; i++) {
      const monthInc = incByMonth[i];
      if (monthInc.length === 0) continue;

      monthInc.forEach((inc, idx) => {
        const monthsRow = new Array(12).fill(0);
        monthsRow[i] = inc.amount;

        // Primer renglón del mes con etiqueta; los siguientes vacíos
        const leftLabel = idx === 0 ? "Mantenimiento" : "";
        const rightTag = idx === 0 ? "FRAS MANTENIMIENTO" : "";

        const row = [leftLabel, ...monthsRow, inc.amount, rightTag];
        ws.addRow(row);

        // Formato €
        const r = ws.lastRow.number;
        for (let c = 2; c <= 14; c++) ws.getRow(r).getCell(c).numFmt = euroFmt;
      });
    }
  } else {
    // NO hay incidencias: mostramos igualmente una fila "Mantenimiento" con todo 0
    const row = [
      "Mantenimiento",
      ...monthlyMaintenance,
      totalMaintenance,
      "FRAS MANTENIMIENTO",
    ];
    ws.addRow(row);
    const r = ws.lastRow.number;
    for (let c = 2; c <= 14; c++) ws.getRow(r).getCell(c).numFmt = euroFmt;
  }

  // Línea “TOTAL FRAS <año>” (siempre visible; solo texto final)
  ws.addRow(new Array(14).fill("").concat([`TOTAL FRAS ${targetYear}`]));
  const totalFrasRowIndex = ws.lastRow.number;
  ws.getRow(totalFrasRowIndex).font = { italic: true };

  // TOTAL MANT/MOB/ANT (siempre visible; suma mensual de incidencias, o 0s)
  const totalMantRowIndex = ws.lastRow.number + 1;
  ws.addRow([
    "TOTAL MANT/MOB/ANT",
    ...monthlyMaintenance,
    totalMaintenance,
    "",
  ]);
  ws.getRow(totalMantRowIndex).font = { bold: true };
  for (let c = 2; c <= 14; c++)
    ws.getRow(totalMantRowIndex).getCell(c).numFmt = euroFmt;

  // ——————————————————————————————————————————————————————
  // RENTA NETA (final) = RENTA NETA MES - Mantenimiento
  // ——————————————————————————————————————————————————————
  const netaFinalRowIndex = ws.lastRow.number + 1;
  ws.addRow(["RENTA NETA", ...monthlyNetFinal, totalNetaFinal, "RENTAS NETAS"]);
  ws.getRow(netaFinalRowIndex).font = { bold: true };
  for (let c = 2; c <= 14; c++)
    ws.getRow(netaFinalRowIndex).getCell(c).numFmt = euroFmt;

  // Formatos € para filas de rooms y totales superiores (ya estaban)
  for (let r = 3; r < totalRentasRowIndex - 1; r++) {
    for (let c = 2; c <= 14; c++) ws.getRow(r).getCell(c).numFmt = euroFmt;
  }
  for (let c = 2; c <= 14; c++) {
    ws.getRow(totalRentasRowIndex).getCell(c).numFmt = euroFmt;
    ws.getRow(fraRowIndex).getCell(c).numFmt = euroFmt;
    ws.getRow(netaMesRowIndex).getCell(c).numFmt = euroFmt;
  }

  // AutoFilter
  ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: 2, column: 15 } };

  // Buffer y respuesta
  const buffer = await wb.xlsx.writeBuffer();
  const filenameSafeStreet = safeSlug(property.street || "propiedad");
  const filename = `informe-fiscal_${filenameSafeStreet}_${targetYear}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

/* ────────────────────────────────────────────────────────────────
 * Util: slug seguro para filename
 * ──────────────────────────────────────────────────────────────── */
function safeSlug(s = "") {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .toLowerCase();
}
