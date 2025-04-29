import { NextResponse } from "next/server";
import { LeaseOrderRoom } from "@/db/init";

export async function getAllPeriodsForReservationsPanel() {
  try {
    const leaseOrders = await LeaseOrderRoom.findAll({
      attributes: ["startDate"],
      raw: true,
      nest: true,
    });

    const allDates = leaseOrders
      .map((order) => {
        if (!order.startDate) return null;
        return new Date(order.startDate).toISOString().split("T")[0]; // UTC seguro
      })
      .filter(Boolean);

    const uniqueDates = Array.from(new Set(allDates)).sort();

    return NextResponse.json(uniqueDates);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
