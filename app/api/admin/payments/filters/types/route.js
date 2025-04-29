import { RentPayment, Supply } from "@/db/init";
import { NextResponse } from "next/server";

// Opcional: Prioridad lógica para los tipos
const FIXED_TYPES_ORDER = [
  "DEPOSIT", // Depósito
  "AGENCY_FEES", // Tasa de agencia
  "GENERAL_SUPPLIES", // Suministros generales
  "INTERNET", // Internet
  "RESERVATION", // Reservas
  "MONTHLY", // Pagos mensuales
  "CLEANUP", // Limpieza
  "MAINTENANCE", // Reparaciones
];

export async function GET() {
  try {
    const [supplies, rentPayments] = await Promise.all([
      Supply.findAll({ attributes: ["type"], raw: true }),
      RentPayment.findAll({ attributes: ["type"], raw: true }),
    ]);

    const allTypes = [
      ...supplies.map((s) => s.type),
      ...rentPayments.map((r) => r.type),
    ]
      .filter((type) => type && type.trim() !== "")
      .map((type) => type.trim());

    const uniqueTypes = Array.from(new Set(allTypes));

    const sortedTypes = uniqueTypes.sort((a, b) => {
      const aPriority = FIXED_TYPES_ORDER.indexOf(a);
      const bPriority = FIXED_TYPES_ORDER.indexOf(b);

      if (aPriority === -1 && bPriority === -1) {
        return a.localeCompare(b);
      }
      if (aPriority === -1) return 1;
      if (bPriority === -1) return -1;

      return aPriority - bPriority;
    });

    return NextResponse.json(sortedTypes, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
