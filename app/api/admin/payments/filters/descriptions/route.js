import { RentPayment, Supply } from "@/db/init";
import { NextResponse } from "next/server";

// Categorías fijas en orden de prioridad
const FIXED_CATEGORIES = [
  { keyword: "depósito", priority: 1 },
  { keyword: "tasa", priority: 2 },
  { keyword: "aporte para suministro", priority: 3 },
  { keyword: "suministro", priority: 4 },
  { keyword: "wifi", priority: 5 },
  { keyword: "internet", priority: 6 },
  { keyword: "servicio de reparación", priority: 7 },
  { keyword: "limpieza", priority: 8 },
];

// Meses en orden
const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

// Detecta si es mensual o quincenal o reserva
const isMonthlyPayment = (description) =>
  description.toLowerCase().includes("pago mensual") ||
  description.toLowerCase().includes("pago quincenal") ||
  description.toLowerCase().includes("renta") ||
  description.toLowerCase().includes("alquiler");

const isReservationPayment = (description) =>
  description.toLowerCase().includes("pago reserva") ||
  description.toLowerCase().includes("reserva");

// Devuelve el índice del mes
const getMonthWeight = (description) => {
  const lower = description.toLowerCase();
  for (let i = 0; i < MONTHS.length; i++) {
    if (lower.includes(MONTHS[i])) return i;
  }
  return 999;
};

// Extrae el año si existe
const getYear = (description) => {
  const match = description.match(/\b(20\d{2})\b/); // busca 2024, 2025, etc
  return match ? parseInt(match[1], 10) : null;
};

// Detecta prioridad según categoría
const getCategoryPriority = (description) => {
  const lowerDesc = description.toLowerCase();
  for (const { keyword, priority } of FIXED_CATEGORIES) {
    if (lowerDesc.includes(keyword)) {
      return priority;
    }
  }
  return 999;
};

export async function GET() {
  try {
    const [supplies, rentPayments] = await Promise.all([
      Supply.findAll({ attributes: ["name"], raw: true }),
      RentPayment.findAll({ attributes: ["description"], raw: true }),
    ]);

    const allDescriptions = [
      ...supplies.map((s) => s.name),
      ...rentPayments.map((r) => r.description),
    ]
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => desc.trim());

    const uniqueDescriptions = Array.from(new Set(allDescriptions));

    const sortedDescriptions = uniqueDescriptions.sort((a, b) => {
      // 1. Prioridad por categorías fijas
      const aPriority = getCategoryPriority(a);
      const bPriority = getCategoryPriority(b);
      if (aPriority !== bPriority) return aPriority - bPriority;

      // 2. Reservas primero
      const aIsReservation = isReservationPayment(a);
      const bIsReservation = isReservationPayment(b);
      if (aIsReservation && !bIsReservation) return -1;
      if (!aIsReservation && bIsReservation) return 1;

      // 3. Pagos mensuales/quincenales después
      const aIsMonthly = isMonthlyPayment(a);
      const bIsMonthly = isMonthlyPayment(b);
      if (aIsMonthly && !bIsMonthly) return -1;
      if (!aIsMonthly && bIsMonthly) return 1;

      // 4. Dentro de pagos de meses, ordenar:
      //    - Primero los que NO tienen año
      //    - Luego por año ascendente
      //    - Dentro de mismo año, por mes
      const aYear = getYear(a);
      const bYear = getYear(b);

      if (aYear === null && bYear !== null) return -1;
      if (aYear !== null && bYear === null) return 1;

      if (aYear !== null && bYear !== null) {
        if (aYear !== bYear) return aYear - bYear;
      }

      const aMonth = getMonthWeight(a);
      const bMonth = getMonthWeight(b);
      if (aMonth !== bMonth) return aMonth - bMonth;

      // 5. Finalmente, alfabético si todo lo demás empata
      return a.localeCompare(b);
    });

    return NextResponse.json(sortedDescriptions, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
